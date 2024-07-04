const ErrorModal = ({ errorMsg, setErrorModal }: { errorMsg: any; setErrorModal: any }) => {
  return (
    <div className="z-[200]">
      <div className="errorModal">
        {/*---content---*/}
        <div className="modalContent">{errorMsg}</div>
        {/*---button---*/}
        <div className="modalButtonContainer">
          <button onClick={() => setErrorModal(false)} className="buttonSecondary">
            Dismiss
          </button>
        </div>
      </div>
      <div className="modalBlackout" onClick={() => setErrorModal(false)}></div>
    </div>
  );
};

export default ErrorModal;
