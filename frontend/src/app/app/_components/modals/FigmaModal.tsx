"use client";
import figmaModalOne from "../../assets/figmaModalOne.png";
import figmaModalTwo from "../../assets/figmaModalTwo.png";
import figmaModalThree from "../../assets/figmaModalThree.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FigmaModal = ({ setFigmaModal }: { setFigmaModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div>
      <div className="modalContainer">
        {/*---close button---*/}
        <button
          onClick={() => setFigmaModal(false)}
          className="absolute top-[calc(100%-20px)] right-[calc(50%-30px)] sm:right-[-20px] sm:top-[-20px] h-[60px] w-[60px] sm:h-[48px] sm:w-[48px] bg-red-400 rounded-full hover:bg-red-500 text-3xl"
        >
          <FontAwesomeIcon icon={faXmark} className="text-white pt-1" />
        </button>
        {/*---Title and Close Button---*/}
        <div className="modalHeaderContainer">
          <div className="modalHeaderText">How to customize your placard with Figma</div>
        </div>
        {/*---Content---*/}
        <div className="overflow-y-auto overflow-x-hidden overscroll-contain">
          <div className="modalContentContainer">
            <div className="mt-2 relative">
              <span className="font-bold">Figma</span> is a free, easy-to-use image editor. With Figma, you can edit your placard's text, icons, color, etc. Or, for 10 USDC, we can
              send you a design in 24 hours (
              <span className="group">
                <span className="link">instructions</span>
                <div className="invisible group-hover:visible w-[344px] absolute top-[100%] left-[calc((100%-344px)/2)] px-3 py-2 text-lg md:text-base border border-slate-700 bg-gray-100 rounded-lg pointer-events-none">
                  Email contact@lingpay.io a description of your design. After you receive the design and are satisfied, we will send instructions on how to pay 10 USDC.
                </div>
              </span>
              ).
            </div>
            {/*---1---*/}
            <div className="flex mt-6 pb-3">
              <div className="modalNumber">1.</div>
              <div>
                Download the Figma desktop app at{" "}
                <a target="_blank" href="https://www.figma.com/downloads/">
                  <span className="link">https://www.figma.com/downloads/</span>
                </a>
              </div>
            </div>
            {/*---2---*/}
            <div className="flex py-3 border-t border-slate-300">
              <div className="modalNumber">2.</div>
              <div>
                <div>Create an account</div>
                <div className="ml-2 sm:ml-4 text-base">You can "skip" through most of the steps.</div>
              </div>
            </div>
            {/*---3---*/}
            <div className="flex py-3 border-t border-slate-300">
              <div className="modalNumber">3.</div>
              <div>On our website, choose the placard language and download the Figma file</div>
            </div>
            {/*---4---*/}
            <div className="flex py-3 border-t border-slate-300">
              <div className="modalNumber">4.</div>
              <div>
                <div>
                  In Figma, click the home icon (top-left) &#10140; click "Import file" (right) and import the Figma file &#10140; double-click the imported Figma file (bottom) to
                  open it in a new tab
                </div>
                <div className="flex justify-center">{/* <img src={figmaModalOne} className="w-full mt-1 mb-1 sm:px-4" /> */}</div>
              </div>
            </div>
            {/*---5---*/}
            <div className="flex py-3 border-t border-slate-300">
              <div className="modalNumber">5.</div>
              <div>
                <div>On the left side, you will see "frame" and a "#" icon.</div>
                <div className="ml-2 sm:ml-4 text-base">
                  Uncollapse the frame (click the small triangle on the left side of the icon). This will reveal all the elements that make up the graphic. Click through each
                  element (uncollapse any element groups) to familiarize yourself with which elements make up the graphic.
                </div>
                <div className="">On the right side, the menu bar has tools to change the properties of any element (size, color, etc.).</div>
                <div className="ml-2 sm:ml-4 text-base">
                  Try changing the background color. On the left, click on the frame element called "frame" in the element list. Then, on the right, click the purple square under
                  "Fill" and select your own color.
                </div>
                <div className="flex justify-center">{/* <img src={figmaModalTwo} className="w-full mt-1 mb-1 sm:px-4" /> */}</div>
              </div>
            </div>
            {/*---6---*/}
            <div className="flex py-3 border-t border-slate-300">
              <div className="modalNumber">6.</div>
              <div>In the center display, move elements around by clicking them and dragging them around.</div>
            </div>
            {/*---7---*/}
            <div className="flex py-3 border-t border-slate-300">
              <div className="modalNumber">7.</div>
              <div>
                <div>Insert your QR code:</div>
                <div className="ml-2 sm:ml-4 text-base">
                  On our website, download your QR code as an SVG file. On Figma, click the Figma icon (top left) &#10140; click "File" &#10140; click "Place Image". Open the saved
                  SVG file and click anywhere on the frame to place the image. Use the tools on the right to change its size and align it.
                </div>
                <div className="flex justify-center">{/* <img src={figmaModalThree} className="w-full mt-1 mb-1 sm:px-4" /> */}</div>
              </div>
            </div>
            {/*---8---*/}
            <div className="flex py-3 border-t border-slate-300">
              <div className="modalNumber">8.</div>
              <div>
                <div>On the right menu, scroll down to find the "Export" function. Export as a PDF for printing. </div>
              </div>
            </div>
            <div className="mt-2 mb-4 font-bold">
              <div>Congratulations! You are now a novice graphics designer. Chain and token SVG icons can be found online. Feel free to contact us for any assistance.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="modalBlackout"></div>
    </div>
  );
};

export default FigmaModal;
