import { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./App.css";

function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [qrMessage, setQrMessage] = useState("");

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
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-around items-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="flex justify-around w-full">
        <div className="flex items-center">
          <p className="font-bold text-white">
            Hora de Codar - Leitor de QR Code
          </p>
        </div>
        <button
          className="p-3 flex rounded-md bg-blue-200 hover:bg-blue-100 transition-all"
          onClick={() => toggleQrCodeVisibility()}
        >
          <span className="material-symbols-outlined">qr_code</span>
        </button>
      </div>

      <div
        className={`relative w-72 h-72 rounded-md overflow-hidden`}
        id="qrCodeContainer"
      ></div>
      {qrMessage && (
        <div className="qr-message absolute top-0 left-0 w-full h-full p-20 flex justify-center items-center bg-blue-400 text-white text-center">
          {qrMessage}
        </div>
      )}
    </div>
  );
}

export default App;
