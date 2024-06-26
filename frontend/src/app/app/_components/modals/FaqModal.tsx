import { useState } from "react";
import Image from "next/image";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faFileInvoiceDollar, faList, faXmark } from "@fortawesome/free-solid-svg-icons";

const Instructions = ({ paymentSettingsState, cashoutSettingsState, setFaqModal }: { paymentSettingsState: any; cashoutSettingsState: any; setFaqModal: any }) => {
  const [expand, setExpand] = useState("");

  return (
    <div>
      {/*--- QUESITONS MODAL ---*/}
      <div className="instructionsModal">
        {/*--- QUESTIONS HEADER ---*/}
        <div className="detailsModalHeaderContainer">
          {/*--- header ---*/}
          <div className="detailsModalHeader">Instructions</div>
          {/*--- mobile back ---*/}
          <div className="mobileBack">
            <FontAwesomeIcon icon={faAngleLeft} onClick={() => setFaqModal(false)} />
          </div>
          {/*--- tablet/desktop close ---*/}
          <div className="xButtonContainer" onClick={() => setFaqModal(false)}>
            <div className="xButton">&#10005;</div>
          </div>
        </div>
        {/*--- QUESTIONS CONTENT ---*/}
        <div className="w-full px-4 portrait:sm:px-8 landscape:lg:px-8 flex flex-col textLg font-medium">
          {/*--- How do I start? ---*/}
          {[
            { title: "How do I start?", id: "setup" },
            { title: "How does a customer pay?", id: "pay" },
            { title: "How do I confirm payment?", id: "confirm" },
            { title: "How should I log a payment?", id: "log" },
            { title: "How do I make refunds?", id: "refund" },
            { title: "How do I cash out?", id: "cashout" },
            { title: "What are the fees?", id: "fees" },
            { title: "Will I lose from changing rates?", id: "lose" },
            { title: "What conversion rate is used?", id: "rate" },
          ].map((i) => (
            <div
              className="desktop:px-3 py-4 desktop:py-3 flex items-center justify-between cursor-pointer desktop:hover:bg-slate-200 dark:desktop:hover:bg-dark5 border-t border-slate-300 dark:border-dark6 transition-all ease-in duration-[100ms] desktop:hover:!duration-[400ms]"
              onClick={() => setExpand(i.id)}
            >
              <div className="">{i.title}</div>
              <div className="">&#10095;</div>
            </div>
          ))}
        </div>
      </div>

      {/*--- ANSWER MODAL ---*/}
      {expand && (
        <div className="instructionsModal">
          {/*--- ANSWERS HEADER ---*/}
          <div className="detailsModalHeaderContainer">
            {/*--- header ---*/}
            <div className="detailsModalHeader">
              {expand == "setup" && <div>How do I start?</div>}
              {expand == "pay" && <div>How does a customer pay?</div>}
              {expand == "confirm" && <div>How do I confirm payment?</div>}
              {expand == "log" && <div>How should I log a payment?</div>}
              {expand == "refund" && <div>How do I make refunds?</div>}
              {expand == "cashout" && <div>How do I cash out?</div>}
              {expand == "fees" && <div>What are the fees?</div>}
              {expand == "lose" && <div>Will I lose money from changing rates?</div>}
              {expand == "rate" && <div>What USDC&#8644;{paymentSettingsState.merchantCurrency} conversion rate is used?</div>}
            </div>
            {/*--- mobile back ---*/}
            <div className="mobileBack">
              <FontAwesomeIcon icon={faAngleLeft} onClick={() => setExpand("")} />
            </div>
            {/*--- tablet/desktop close ---*/}
            <div className="xButtonContainer" onClick={() => setExpand("")}>
              <div className="xButton">&#10005;</div>
            </div>
          </div>

          {/*--- ANSWER CONTENT ---*/}
          <div className="flex-1 w-full textLg overflow-y-auto scrollbar">
            <div className="px-4 portrait:sm:px-8 landscape:lg:px-8">
              {expand == "setup" && paymentSettingsState.merchantPaymentType == "inperson" && (
                <div className="space-y-3">
                  <p>To start accepting crypto payments, print out and display your QR code so that customers can see it.</p>
                  <p>
                    We emailed you the QR code when you created this account. You can re-send the email or download the QR code by going to{" "}
                    <span className="font-semibold">Payments</span> &gt; <span className="font-semibold">QR Code</span> &gt; <span className="font-semibold">Export</span>.
                  </p>
                  <p>Recommendations on how to print and display your QR code will be given to you when you export it.</p>
                </div>
              )}
              {expand == "setup" && paymentSettingsState.merchantPaymentType == "online" && (
                <div className="flex flex-col space-y-3">
                  <div>
                    Copy your Payment Link in the <span className="font-semibold">Cash Out</span> menu and use it in an &lt;a&gt; tag in your HTML code to create a "Pay With
                    MetaMask" button in your checkout page. When a user clicks the button, they will be be able to make payments with MetaMask on desktop or mobile.
                  </div>
                  <div className="">
                    (Optional) <span className="link">Download the QR Code placard</span> (or naked QR code in <span className="link">SVG</span> or{" "}
                    <span className="link">PNG</span> format) and put it on any appropriate online medium
                  </div>
                  <div className="">
                    (Optional) To edit your placard's size or design, read <span className="link">these instructions</span> and download{" "}
                    <span className="link">this Figma file</span>
                  </div>
                </div>
              )}
              {expand == "pay" && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative w-full max-w-[320px] sm:max-w-[300px] h-[calc(100vw*(3/4*0.85))] max-h-[calc(320px*(3/4))] sm:max-h-[calc(300px*(3/4))] flex-none">
                    <Image
                      src="/intro-scan.png"
                      alt="scan"
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p className="relative">
                    Before payment, the customer must have the{" "}
                    <span className="group">
                      <span className="link">
                        MetaMask app<sup>?</sup>
                      </span>
                      <div className="w-full top-[calc(100%+4px)] tooltip">
                        MetaMask is the most popular app to send/receive tokens and is used by 50+ million people worldwide.
                      </div>
                    </span>{" "}
                    and{" "}
                    <span className="group">
                      <span className="link">
                        USDC<sup>?</sup>
                      </span>
                      <div className="w-full top-[calc(100%+4px)] tooltip">1 USDC token equals to 1 USD, as gauranteed by Circle. Almost all crypto users have USDC.</div>
                    </span>{" "}
                    tokens on the{" "}
                    <span className="group">
                      <span className="link">
                        Polygon network<sup>?</sup>
                      </span>
                      <div className="w-full top-[calc(100%+4px)] tooltip">
                        The Polygon network is a blockchain that has cheap transaction fees (~$0.01) and is integrated with many platforms.
                      </div>
                    </span>
                    .
                  </p>
                  <p>
                    To pay, the customer scans your QR code, which opens their Metamask app. In the app, the customer{" "}
                    <span className="font-semibold dark:font-bold"> enters the amount of {paymentSettingsState.merchantCurrency} for payment</span>.
                  </p>
                  <p>When the customer submits payment, USDC tokens (equal in value to the amount of EUR entered) will be sent from their MetaMask to your Flash app.</p>
                </div>
              )}
              {expand == "confirm" && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative w-[200px] h-[330px]">
                    <Image src="/phone.png" alt="payments" fill />
                  </div>
                  <p>
                    About 3-6s after a customer makes a successful payment, you will receive a notification in your Flash app. The payment will then appear in{" "}
                    <span className="font-semibold">Payments</span>.
                  </p>
                </div>
              )}
              {/*--- ONLINE PAYMENTS ---*/}
              {/* <div className="mt-1">You can confirm the payment in two ways:</div>
            <div className="mt-1 ml-3 text-base leading-tight xs:text-sm xs:leading-tight">
              <span className="font-bold">Check your email.</span> If payment has been successfully sent to you, you will receive an email. The email will contain all information
              about the purchase.
            </div>
            <div className="mt-1 ml-3 text-base leading-tight xs:text-sm xs:leading-tight">
              <span className="font-bold">Check the Flash Pay App.</span> Payment should appear in the{" "}
              <span className="text-blue-700 font-bold whitespace-nowrap">
                <FontAwesomeIcon icon={faList} className="pr-0.5" />
                Payments
              </span>{" "}
              menu tab after ~5s (a page refresh may be needed)
            </div> */}
              {expand == "log" && (
                <div className="space-y-3">
                  <p>
                    A record of all payments made through Flash can be downloaded as a .CSV file in <span className="font-semibold">Payments</span>.
                  </p>
                  <p>
                    If you have PoS device, we recommend you log the payment in your PoS device as a cash payment. That way, you have a record of the payment in your PoS system.
                  </p>
                </div>
              )}
              {expand == "refund" && (
                <div className="space-y-3">
                  <p>
                    You (the owner) can refund payments by clicking on a transaction in <span className="font-semibold">Payments</span>, then clicking "Refund Now".
                  </p>
                  <p>Due to security, employees are restricted from transferring funds. Therefore, they cannot make refunds.</p>
                  <p className="">
                    Instead, employees can label a payment as "To Refund". Then, at any time, you (the owner) can go to the <span className="font-semibold">Payments</span> menu and
                    refund all payments labeled with this tag in a single click.
                  </p>
                  <p>Security is our top concern and we believe this is the most secure way to conduct refunds.</p>
                </div>
              )}
              {expand == "cashout" && (
                <div>
                  {paymentSettingsState.merchantCountry != "Any country" && cashoutSettingsState.cex == "Coinbase" ? (
                    <div className="space-y-3">
                      <div className="font-semibold dark:font-bold">SETTING UP</div>
                      <div className="flex">
                        <div className="mr-2">1.</div>
                        <div>Sign up for a Coinbase account. Then, under the Settings tab of your Coinbase account, link a bank account.</div>
                      </div>
                      <div className="flex">
                        <div className="mr-1.5">2.</div>
                        <div>
                          In the <span className="font-semibold dark:font-bold">Cash Out</span> menu of your Flash app, click "Link your Coinbase account".
                        </div>
                      </div>
                      <div className="font-semibold dark:font-bold">CASHING OUT</div>
                      <div className="flex">
                        <div className="mr-1.5">1.</div>
                        <div>
                          In the <span className="font-semibold dark:font-bold">Cash Out</span> menu, click "Transfer to Coinbase" to transfer USDC from your Flash app to your
                          Coinbase account. Wait 1-5 minutes for the Coinbase balance to update.
                        </div>
                      </div>
                      <div className="flex">
                        <div className="mr-1.5">2.</div>
                        <div>
                          In the <span className="font-semibold dark:font-bold">Cash Out</span> menu, click "Transfer to Bank". When you submit a transfer, USDC will be
                          automatically converted to {paymentSettingsState.merchantCurrency} and the money will be deposited to your bank within 1-2 days.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <div className="flex">
                          <div className="mr-1">1.</div>
                          <div>Log into your {cashoutSettingsState.cex == "Other CEX" ? "CEX" : cashoutSettingsState.cex} account and find the USDC (Polygon) deposit address</div>
                        </div>
                        <div className="flex">
                          <div className="mr-1">2.</div>
                          <div>Paste this address into the "CEX EVM Address" field in Settings</div>
                        </div>
                        <div className="flex">
                          <div className="mr-1">3.</div>
                          <div>
                            In the <span className="font-semibold">Cash Out</span> menu, click the "Transfer to{" "}
                            {cashoutSettingsState.cex == "Other CEX" ? "CEX" : cashoutSettingsState.cex}" button and make a transfer
                          </div>
                        </div>
                        <div className="flex">
                          <div className="mr-1">4.</div>
                          <div>
                            Log into your {cashoutSettingsState.cex == "Other CEX" ? "CEX" : cashoutSettingsState.cex} account, convert USDC to the local currency, and withdraw the
                            money to your bank.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {expand == "fees" && (
                <div className="space-y-3">
                  <p>Flash charges no fees per transaction (Flash makes zero profit per transaction). </p>
                  <p>
                    When transferring USDC from your Flash app to your {cashoutSettingsState.cex == "Other CEX" ? "CEX" : cashoutSettingsState.cex} account, there is a ~0.05 USDC
                    blockchain transaction fee.
                  </p>
                  <p>
                    When transferring funds from your {cashoutSettingsState.cex == "Other CEX" ? "CEX" : cashoutSettingsState.cex} account to your bank,{" "}
                    {paymentSettingsState.merchantCountry != "Any country" && cashoutSettingsState.cex == "Coinbase"
                      ? "there are no fees."
                      : "the transfer may be free or have a fee. Please check your CEX's website."}{" "}
                    Therefore, your total fees when using Flash is ~0%.
                  </p>
                </div>
              )}
              {expand == "lose" && (
                <div className="space-y-3">
                  <p>Over the long run, you will not lose money from fluctuating USDC to {paymentSettingsState.merchantCurrency} rates (in fact, you might earn a little).</p>
                  <p>
                    During payment, our interface alters the USDC-to-{paymentSettingsState.merchantCurrency} market rate by 0.3% in favor of the business. This means that
                    businesses will earn an extra 0.3%. Over the long run, these extra earnings should cover any potential losses from fluctuating rates.
                  </p>
                  <p className="font-semibold">Here is an example:</p>
                  <p>Let's assume the USDC-to-EUR rate is 0.90. When a customer enters 10 EUR in MetaMask and clicks "Pay", you will receive:</p>
                  <p className="text-center">(10.00 * 0.98) / (0.90 * 0.997) = 10.9217 USDC </p>
                  <p>
                    in your Flash app. This includes the 2% discount that you had given to the customer. When you cash out to the bank and if the rate of 0.90 did not change, you
                    will receive 10.9217 * 0.90 = 9.83 EUR. With the 2% discount, you should have received 9.80 EUR. Instead, you recieved 9.83 EUR or an extra ~0.3%, which should
                    offset any loses from fluctuating exchange rates, if you cash out frequently (we recommend cashing out at least once a week).
                  </p>
                  <p>
                    We don't believe customers will care about this extra 0.3%, as they are receiving a 2% discount from you already. But, even without this 2% discount, customers
                    (particularly international travelers) will not care because the USDC-to-EUR rate used during payment will usually be 1-5% better than the USD-to-EUR rate they
                    will get at any local currency exchanger.
                  </p>
                </div>
              )}
              {expand == "rate" && (
                <div>
                  {paymentSettingsState.merchantCurrency == "USD" && <div>USDC is converted to USD at a 1:1 rate with no fees.</div>}
                  {paymentSettingsState.merchantCurrency != "USD" && (
                    <div>
                      On the Flash app, when you transfer funds from Coinbase to your bank, the USDC in your Coinbase account will be converted to{" "}
                      {paymentSettingsState.merchantCurrency}, and the money deposited to your bank. The conversion rate is taken from Coinbase and is usually better than
                      USD-to-EUR rate given by any bank.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="modalBlackout"></div>
    </div>
  );
};

export default Instructions;
