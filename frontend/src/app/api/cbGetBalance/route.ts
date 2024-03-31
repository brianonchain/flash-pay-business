import axios from "axios";
import dbConnect from "@/db/dbConnect";
import UserModel from "@/db/models/UserModel";
import { keccak256, getAddress } from "viem";
import * as jose from "jose";

export const POST = async (request: Request) => {
  console.log("entered getCbBalance endpoint");

  const { cbAccessToken, cbRefreshToken, idToken, publicKey } = await request.json();
  console.log("cbAccessToken=", cbAccessToken, "cbRefreshToken=", cbRefreshToken);

  // 1. If cbAccessToken exists, then get balance
  // 2. If no cbAccessToken, call Coinbase's API to get new tokens. Get balance and store new refresh token to local browser.
  // 3. If no cbRefreshToken, then return "no cbRefreshToken"
  if (cbAccessToken) {
    console.log("cbAccessToken exists, getting balance...");
    const { balance, cexEvmAddress, cexAccountName } = await getCbBalance(cbAccessToken);
    if (balance == "error") {
      console.log({ status: "error", message: "failed to get balance, likely invalid cbAccessToken" });
      return Response.json({ status: "error", message: "failed to get balance, likely invalid cbAccessToken" });
    }
    // save to db
    const isSaved = await saveToDb(publicKey, idToken, cexEvmAddress, cexAccountName);
    console.log("isSaved", isSaved);
    // return success
    console.log({ status: "success", balance: balance, cexEvmAddress: cexEvmAddress, cexAccountName: cexAccountName });
    return Response.json({ status: "success", balance: balance, cexEvmAddress: cexEvmAddress, cexAccountName: cexAccountName });
  } else {
    if (cbRefreshToken) {
      console.log("no cbAccessToken, but cbRefreshToken exists. Getting new tokens from Coinbase...");
      try {
        const res = await axios.post("https://api.coinbase.com/oauth/token", {
          grant_type: "refresh_token",
          client_id: process.env.NEXT_PUBLIC_COINBASE_CLIENT_ID,
          client_secret: process.env.COINBASE_CLIENT_SECRET,
          refresh_token: cbRefreshToken,
        });
        console.log(res.data);
        const { balance, cexEvmAddress, cexAccountName } = await getCbBalance(res.data.access_token);
        if (balance == "error") {
          console.log({ status: "error", message: "failed to get balance, likely invalid cbAccessToken" });
          return Response.json({ status: "error", message: "failed to get balance, likely invalid cbAccessToken" });
        }
        // save to db
        const isSaved = await saveToDb(publicKey, idToken, cexEvmAddress, cexAccountName);
        console.log("isSaved", isSaved);
        // return success
        console.log({ status: "success", balance: balance, cexEvmAddress: cexEvmAddress, cexAccountName: cexAccountName });
        return Response.json({
          status: "success",
          balance: balance,
          cexEvmAddress: cexEvmAddress,
          cexAccountName: cexAccountName,
          cbAccessToken: res.data.access_token,
          cbRefreshToken: res.data.refresh_token,
        });
      } catch (err) {
        const error = { status: "error", message: "failed to get new tokens from Coinbase" };
        console.log(error, err);
        return Response.json(error);
      }
    } else {
      const error = { status: "error", message: "no cbAccessTokens or cbRefreshTokens" };
      console.log(error);
      return Response.json(error);
    }
  }
};

const getCbBalance = async (cbAccessToken: string) => {
  console.log("getCbBalance function, cbAccessToken", cbAccessToken);
  try {
    // get balance
    const res = await axios.get("https://api.coinbase.com/v2/accounts", { headers: { Authorization: `Bearer ${cbAccessToken}` } });
    const accounts = res.data.data; // accounts = array of accounts
    const usdcAccount = accounts.find((i: any) => i.name === "USDC Wallet");
    const balance = usdcAccount.balance.amount; // returns string with 6 decimals
    console.log(balance);
    //get cexEvmAddress
    const usdcAccountId = usdcAccount.id;
    const resCexAddresses = await axios.get(`https://api.coinbase.com/v2/accounts/${usdcAccountId}/addresses`, {
      headers: { Authorization: `Bearer ${cbAccessToken}` },
    });
    const cexAddressObjects = resCexAddresses.data.data; // returns Solana and Ethereum address objects
    const usdcAddressObject = cexAddressObjects.find((i: any) => i.network === "ethereum"); // find the Ethereum account
    const cexEvmAddress = usdcAddressObject.address; // get address
    console.log(cexEvmAddress);

    // get cexAccountName
    const resCexAccountName = await axios.get(`https://api.coinbase.com/v2/user`, {
      headers: { Authorization: `Bearer ${cbAccessToken}` },
    });
    const cexAccountName = resCexAccountName.data.data.name;
    console.log(cexAccountName);

    // return
    return { balance, cexEvmAddress, cexAccountName };
  } catch (err: any) {
    console.log("getCbBalance function error", err.response.status, err.response.statusText);
    return { balance: "error", cexEvmAddress: "error" };
  }
};

const saveToDb = async (publicKey: string, idToken: string, cexEvmAddress: string, cexAccountName: string): Promise<boolean> => {
  try {
    await dbConnect; // connect to db
    // compute publicKeyCompressed and merchantEvmAddress from publicKey
    const prefix = Number(publicKey.slice(-1)) % 2 == 0 ? "02" : "03";
    const publicKeyCompressed = prefix + publicKey.substring(2).slice(0, -64); // substring(2) removes first 2 chars, slice(0, -64) removes last 64 chars
    const merchantEvmAddress = getAddress("0x" + keccak256(Buffer.from(publicKey.substring(2), "hex")).slice(-40)); // slice(-40) keeps last 40 chars
    // verify
    const jwks = jose.createRemoteJWKSet(new URL("https://api-auth.web3auth.io/jwks")); // for social logins
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ["ES256"] });
    const verified = (jwtDecoded.payload as any).wallets[0].public_key.toLowerCase() == publicKeyCompressed.toLowerCase();
    // update db
    if (verified) {
      await UserModel.findOneAndUpdate(
        { "paymentSettings.merchantEvmAddress": merchantEvmAddress },
        { "cashoutSettings.cexEvmAddress": cexEvmAddress, "cashoutSettings.cexAccountName": cexAccountName }
      );
      return true;
    } else {
      console.log("not verified");
      return false;
    }
  } catch (e: any) {
    console.log("error when saving to db");
    return false;
  }
};
