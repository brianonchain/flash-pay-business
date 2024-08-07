//next
import Image from "next/image";
import { useState } from "react";
// images
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// types
import { Rates } from "@/utils/types";
import { currency2decimal, currency2symbol, currency2bank } from "@/utils/constants";

const Inperson = ({
  urlParams,
  currencyAmount,
  setCurrencyAmount,
  currencyAmountAfterCashback,
  setCurrencyAmountAfterCashback,
  selectedToken,
  rates,
  send,
  fxSavings,
  tokenAmount,
  setTokenAmount,
}: {
  urlParams: any;
  currencyAmount: string;
  setCurrencyAmount: any;
  currencyAmountAfterCashback: string;
  setCurrencyAmountAfterCashback: any;
  selectedToken: string;
  rates: Rates;
  send: any;
  fxSavings: string;
  tokenAmount: string;
  setTokenAmount: any;
}) => {
  const [digits, setDigits] = useState(4);

  return (
    <div className="w-[356px] h-full max-h-[540px] flex flex-col items-center justify-between">
      {/*---blank---*/}
      <div></div>
      {/*---Pay To---*/}
      <div className="text-center">
        <div className="text-lg font-bold text-slate-500">PAY TO</div>
        <div className="mt-2 text-2xl font-semibold line-clamp-1">{urlParams.merchantName}</div>
      </div>

      {/*--- AMOUNT BOX ---*/}
      <div className="mb-4 flex justify-center items-center relative">
        <div className="w-full h-[2px] bg-slate-300 absolute top-[calc(100%)]"></div>
        <div className={`${urlParams.merchantCurrency == "TWD" ? "text-3xl bottom-2 font-semibold" : "text-5xl"} absolute right-[calc(100%+12px)]`}>
          {currency2symbol[urlParams.merchantCurrency]}
        </div>
        <input
          id="payCurrencyAmount"
          className={`text-5xl font-medium p-0 text-center focus:placeholder:text-transparent bg-white outline-none focus:outline-none focus:ring-0 border-none focus:border-none placeholder:text-slate-400`}
          onChange={(e) => {
            setCurrencyAmount(e.currentTarget.value);
            const currencyAmountAfterCashbackTemp = (Number(e.currentTarget.value) * 0.98).toFixed(currency2decimal[urlParams.merchantCurrency]);
            setCurrencyAmountAfterCashback(currencyAmountAfterCashbackTemp);
            setTokenAmount((Number(currencyAmountAfterCashbackTemp) / rates.usdcToLocal).toFixed(2));
            setDigits(e.currentTarget.value.toString().length > 4 ? e.currentTarget.value.toString().length : 4);
            // setShowNetwork(true);
          }}
          type="number"
          inputMode="decimal"
          value={currencyAmount}
          placeholder={urlParams.merchantCurrency == "TWD" ? "0" : "0.00"}
          style={{ width: `${digits * (urlParams.merchantCurrency == "TWD" ? 32 : 28)}px` }}
          // step="0.01" // TODO: step is not working
        ></input>
      </div>

      {/*---select network---*/}
      {/* <div className={`${showNetwork ? "" : "invisible"} w-[340px] flex flex-col items-center`}>
        <div className="text-xl font-bold">Select a network:</div>
        <div className="w-full ">Polygon</div>
        {merchantNetworks.map((i: any) => (
          <div key={i.name} className={` flex flex-col items-center`}>
            <div
              id={i.name}
              data-category="network"
              onClick={onClickNetwork}
              className={`${
                selectedNetwork == i.name ? "bg-gray-100 border-gray-100" : `${selectedNetwork ? "bg-white border-gray-100 opacity-50" : "bg-white border-gray-100"}`
              } h-[58px] w-[58px] flex flex-col justify-center items-center pt-1 pb-0.5 text-[10px] text-center active:bg-gray-200 border rounded-full drop-shadow-md cursor-pointer`}
            >
              <div className="relative w-[22px] h-[22px]">
                <Image src={i.img} alt={i.name} fill />
              </div>
              <div className="leading-tight pointer-events-none">{i.name}</div>
              <div className="leading-tight pointer-events-none">${i.gas}</div>
            </div>
          </div>
        ))}
      </div> */}
      {/*---AMOUNT SENT + SAVINGS---*/}
      <div className={`${currencyAmount ? "" : "invisible"} w-full flex flex-col items-center`}>
        {/*--- AMOUNT SENT ---*/}
        <div className="flex text-center text-2xl font-semibold">
          {tokenAmount} {selectedToken} will be sent
        </div>

        {/*--- SAVINGS ---*/}
        <div className="mt-4 w-full flex justify-between text-base text-slate-500 font-medium relative">
          {/*--- fx savings ---*/}
          {urlParams.merchantCurrency != "USD" && (
            <div className="flex items-center group">
              <div className="flex flex-col items-center">
                <div>FX Savings</div>
                <div className=" text-green-500 text-lg">{fxSavings}%</div>
                {/*--- tooltip ---*/}
                <div className="w-full bottom-[calc(100%+2px)] left-0 tooltip text-start dark:bg:slate-700 dark:text-white">
                  <p>
                    Your rate: 1 {selectedToken} &rarr; {rates.usdcToLocal} {urlParams.merchantCurrency}
                  </p>
                  <p>
                    {currency2bank[urlParams.merchantCurrency]} rate: 1 USD &rarr; {rates.usdToLocal} {urlParams.merchantCurrency}
                  </p>
                </div>
              </div>
              <FontAwesomeIcon icon={faCircleInfo} className="ml-1 text-sm text-slate-400" />
            </div>
          )}
          {/*--- instant cashback ---*/}
          <div className="flex items-center group">
            <div className="flex flex-col items-center text-center">
              <p>Instant Cashback</p>
              <p className=" text-green-500 text-lg">2%</p>
              {/*--- tooltip ---*/}
              <div className="w-full left-0 bottom-[calc(100%+2px)] tooltip text-start dark:bg:slate-700 dark:text-white">
                The value of USDC that will be sent is 2% less than the value of the {urlParams.merchantCurrency} entered
              </div>
            </div>
            <FontAwesomeIcon icon={faCircleInfo} className="ml-1 text-sm text-slate-400" />
          </div>
          {/*--- total savings ---*/}
          {urlParams.merchantCurrency != "USD" ? (
            <div className="flex flex-col items-center text-center">
              <p>You Save</p>
              <div>
                <div className=" text-green-500 text-lg">{2 + Number(fxSavings)}%</div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/*---SEND BUTTON---*/}
        <div className={`${currencyAmount ? "" : "invisible"} px-3 my-6 flex justify-center w-full`}>
          <button onClick={send} className="w-full h-[56px] font-semibold text-white bg-[#0376C9] active:brightness-[1.1] rounded-full text-xl">
            PAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inperson;
