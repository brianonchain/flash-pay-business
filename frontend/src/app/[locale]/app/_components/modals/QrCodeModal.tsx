// nextjs
import { useState } from "react";
import Image from "next/image";
// other
import { QRCodeSVG } from "qrcode.react";
import { pdf, Document, Page, Path, Svg, View } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useTranslations } from "next-intl";
// components
import Placard from "../placard/Placard";
// images
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
// types
import { PaymentSettings, Transaction } from "@/db/UserModel";
import SpinningCircleGray from "@/utils/components/SpinningCircleGray";

const qrCodeModal = ({ paymentSettingsState, setQrCodeModal }: { paymentSettingsState: PaymentSettings; setQrCodeModal: any }) => {
  const [email, setEmail] = useState(paymentSettingsState.merchantEmail);
  const [isSendingEmail, setIsSendingEmail] = useState("initial"); // "initial" | "sending" | "sent"
  // modals
  const [qrCodeModalExportOptions, setQrCodeModalExportOptions] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // hooks
  const t = useTranslations("App.Payments.qrCodeModal");
  const tcommon = useTranslations("Common");

  const hideQrCodeModalExportOptions = () => {
    setQrCodeModalExportOptions(false);
    document.removeEventListener("click", hideQrCodeModalExportOptions);
  };

  const emailQrCode = async () => {
    // check if valid email
    if (!email.split("@")[1]?.includes(".")) {
      setErrorMsg(t("emailModal.errors.validEmail"));
      setError(true);
      return;
    }

    setIsSendingEmail("sending");

    // create PDF file blob
    const el = document.getElementById("qrCodeForDownload");
    const dataString = await pdf(
      <Document>
        <Page size="A5" style={{ position: "relative" }}>
          <View>
            <Placard />
          </View>
          <View style={{ position: "absolute", transform: "translate(108, 190)" }}>
            {/* @ts-ignore */}
            <Svg width="210" height="210" viewBox={el?.attributes.viewBox.value} fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* @ts-ignore */}
              <Path fill="#ffffff" d={el?.children[0].attributes.d.value} shape-rendering="crispEdges"></Path>
              {/* @ts-ignore */}
              <Path fill="#000000" d={el?.children[1].attributes.d.value} shape-rendering="crispEdges"></Path>
            </Svg>
          </View>
        </Page>
      </Document>
    ).toString();

    // make api call
    const res = await fetch("/api/emailQrCode", {
      method: "POST",
      body: JSON.stringify({ merchantEmail: email, dataString }),
    });

    // api response
    const response = await res.json();
    console.log(response);
    if (response == "email sent") {
      setIsSendingEmail("sent");
    } else {
      setErrorMsg(t("emailModal.errors.notSend"));
      setError(true);
      setIsSendingEmail("initial");
    }
  };

  const downloadQrCode = async () => {
    const el = document.getElementById("qrCodeForDownload");
    const blob = await pdf(
      <Document>
        <Page size="A5" style={{ position: "relative" }}>
          <View>
            <Placard />
          </View>
          <View style={{ position: "absolute", transform: "translate(108, 190)" }}>
            {/* @ts-ignore */}
            <Svg width="210" height="210" viewBox={el?.attributes.viewBox.value} fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* @ts-ignore */}
              <Path fill="#ffffff" d={el?.children[0].attributes.d.value} shape-rendering="crispEdges"></Path>
              {/* @ts-ignore */}
              <Path fill="#000000" d={el?.children[1].attributes.d.value} shape-rendering="crispEdges"></Path>
            </Svg>
          </View>
        </Page>
      </Document>
    ).toBlob();
    saveAs(blob, "FlashQrCode");
  };

  return (
    <div className="z-[10]">
      <div className="fixed inset-0 bg-black">
        {/*--- close button ---*/}
        <div
          className="qrCodeModalIconContainer top-[8px] right-[8px] portrait:sm:top-[32px] portrait:sm:right-[32px] landscape:lg:top-[32px] landscape:lg:right-[32px]"
          onClick={() => setQrCodeModal(false)}
        >
          <div className="text-4xl text-white">&#10005;</div>
        </div>
        {/*--- export button ---*/}
        <div
          className="qrCodeModalIconContainer bottom-[12px] left-[12px] portrait:sm:bottom-[32px] portrait:sm:left-[32px] landscape:lg:bottom-[32px] landscape:lg:left-[32px]"
          onClick={() => {
            if (!qrCodeModalExportOptions) {
              document.addEventListener("click", hideQrCodeModalExportOptions);
            }
            setQrCodeModalExportOptions(true);
          }}
        >
          <div className="relative w-[32px] h-[32px]">
            <Image src="/exportWhite.svg" alt="export icon" fill />
          </div>
        </div>
      </div>
      {/*--- export options ---*/}
      {qrCodeModalExportOptions && (
        <div className="textXl absolute left-[24px] bottom-[76px] portrait:sm:left-[32px] portrait:sm:bottom-[110px] landscape:lg:left-[32px] landscape:lg:bottom-[110px] cursor-pointer bg-slate-200 text-black rounded-xl z-[13]">
          <div className="px-[24px] py-[16px] landscape:xl:desktop:hover:opacity-50 border-b border-gray-300" onClick={() => setEmailModal(true)}>
            {t("emailPdf")}
          </div>
          <div className="px-[24px] py-[16px] landscape:xl:desktop:hover:opacity-50" onClick={downloadQrCode}>
            {t("downloadPdf")}
          </div>
        </div>
      )}
      {/*--- placard ---*/}
      <div className="portrait:w-full portrait:h-[calc(100vw*1.4142)] landscape:w-[calc(100vh/1.4142)] portrait:max-w-[560px] portrait:max-h-[calc(560px*1.4142)] landscape:h-screen fixed inset-1/2 -translate-y-[50%] -translate-x-1/2 z-[11]">
        <div className="w-full h-full relative">
          <Image src="/placard.svg" alt="placard" fill priority />
        </div>
      </div>
      {/*--- qr code ---*/}
      <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-[12]">
        <QRCodeSVG
          xmlns="http://www.w3.org/2000/svg"
          size={
            window.innerWidth > window.innerHeight
              ? Math.round((window.innerHeight / 1.4142) * (210 / 424.26))
              : window.innerWidth > 560
              ? Math.round(560 * 1.4142 * (210 / 424.26))
              : Math.round(window.innerWidth * (210 / 424.26))
          }
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          value={paymentSettingsState?.qrCodeUrl ?? ""}
        />
      </div>
      {/*--- qr code for download purposes ---*/}
      <div className="hidden">
        <QRCodeSVG
          id="qrCodeForDownload"
          xmlns="http://www.w3.org/2000/svg"
          size={210}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          value={paymentSettingsState.qrCodeUrl}
        />
      </div>

      {emailModal && (
        <div className="z-[20]">
          <div className="emailModal z-[22]">
            {!error && (
              <div className="w-full flex flex-col items-center">
                {/*--- tablet/desktop close ---*/}
                <div
                  className="xButtonContainer"
                  onClick={() => {
                    setEmailModal(false);
                    setEmail(paymentSettingsState.merchantEmail);
                    setIsSendingEmail("initial");
                  }}
                >
                  <div className="xButton">&#10005;</div>
                </div>
                {/*--- mobile back ---*/}
                <div className="mobileBack">
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    onClick={() => {
                      setEmailModal(false);
                      setEmail(paymentSettingsState.merchantEmail);
                      setIsSendingEmail("initial");
                    }}
                  />
                </div>
                {/*--- header ---*/}
                <div className="detailsModalHeader">{t("emailModal.title")}</div>

                {/*---content---*/}
                <div className="w-full flex-1 px-[16px] portrait:sm:px-[32px] landscape:lg:px-[32px] landscape:xl:desktop:px-[32px] space-y-[24px] overflow-y-auto scrollbar">
                  <div className="textXl mt-[12px]">{t("emailModal.text")}</div>
                  <div className="w-full">
                    <label className="textLg font-semibold">{t("emailModal.label")}</label>
                    <div className="mt-[4px] flex items-center relative">
                      <input
                        className="text-[18px] portrait:sm:text-[24px] landscape:lg:text-[24px] landscape:xl:desktop:text-[18px] peer w-full h-[56px] landscape:xl:desktop:h-[44px] px-[12px] focus:cursor-text rounded-md outline-none bg-transparent dark:focus:bg-dark3 border border-gray-300 focus:border-blue-500 focus:dark:border-slate-500 transition-all duration-[300ms] placeholder:text-slate-400 placeholder:dark:text-slate-600 placeholder:font-normal placeholder:italic"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        value={email}
                        placeholder="Enter an email address"
                      />
                      {email && (
                        <div className="absolute w-[28px] h-[28px] right-2 cursor-pointer desktop:hover:text-slate-500 peer-focus:hidden" onClick={() => setEmail("")}>
                          &#10005;
                        </div>
                      )}
                    </div>
                  </div>
                  {/*---button---*/}
                  <div className="w-full pt-[16px] pb-[16px]">
                    {isSendingEmail == "initial" && (
                      <button onClick={emailQrCode} className="buttonPrimary">
                        {t("emailModal.button")}
                      </button>
                    )}
                    {isSendingEmail == "sending" && (
                      <div onClick={emailQrCode} className="w-full flex items-center justify-center">
                        <SpinningCircleGray />
                        <div className="ml-3 textLg">{t("emailModal.sending")}...</div>
                      </div>
                    )}
                    {isSendingEmail == "sent" && (
                      <div onClick={emailQrCode} className="w-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-2xl" />
                        <div className="ml-3 textLg">{t("emailModal.sent")}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/*--- if error ---*/}
            {error && (
              <div className="w-full flex-1 flex flex-col px-[16px] portrait:sm:px-[32px] landscape:lg:px-[32px] landscape:xl:desktop:px-[32px] space-y-[24px] overflow-y-auto scrollbar">
                {/*--- text ---*/}
                <div className="flex-1 w-full textXl text-center flex items-center justify-center">{errorMsg}</div>
                {/*--- button ---*/}
                <div className="w-full py-[60px]">
                  <button onClick={() => setError(false)} className="buttonPrimary">
                    {tcommon("close")}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="modalBlackout z-[21]"></div>
        </div>
      )}
    </div>
  );
};

export default qrCodeModal;
