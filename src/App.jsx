import { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./App.css";

function App() {
  const [isEnabled, setEnabled] = useState(false);
  const [qrMessage, setQrMessage] = useState("");
  const [isQrCodeVisible, setQrCodeVisible] = useState(false);

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => console.log("Leitor parado"))
          .catch(() => console.log("O leitor parou com erro"));
      }
    };

    const qrCodeSuccess = (decodedText) => {
      setQrMessage(decodedText);
      setEnabled(false);
    };

    if (isEnabled) {
      html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess);
      setQrMessage("");
    } else {
      qrScanerStop();
    }
    return () => {
      qrScanerStop();
    };
  }, [isEnabled]);

  const toggleQrCodeVisibility = () => {
    setQrCodeVisible(!isQrCodeVisible);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div
        className={`relative w-72 h-72 rounded-md overflow-hidden ${
          isQrCodeVisible ? "block" : "hidden"
        }`}
        id="qrCodeContainer"
      ></div>
      {qrMessage && (
        <div className="qr-message absolute top-0 left-0 w-full h-full p-20 flex justify-center items-center bg-blue-400 text-white text-center">
          {qrMessage}
        </div>
      )}
      <button
        className="absolute top-10 right-10 p-3 flex rounded-md bg-blue-200 hover:bg-blue-100 transition-all"
        onClick={() => {
          setEnabled(!isEnabled);
          toggleQrCodeVisibility();
        }}
      >
        <span className="material-symbols-outlined">qr_code</span>
      </button>
      <div className="absolute top-10 left-10 flex items-center">
        <img
          src="src/assets/hora-de-codar.png"
          alt="Hora de codar"
          className="w-12 mx-2"
        />
        <p className="font-bold text-white">Hora de codar</p>
      </div>
    </div>
  );
}

export default App;
