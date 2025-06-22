import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";

const Front = () => {
  const [text, setText] = useState("Wellcome to Nakib's QR code Genarator");
  const [textLength, setTextLength] = useState(0);
  const qrRef = useRef(null);

  const textChangeHandler = (e) => {
    setText(e.target.value);
    setTextLength(e.target.value.length);
  };

  const downloadQrCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    img.src = url;
  }
  return (
    <div>
      <p className="font-bold text-4xl text-center py-10 bg-gradient-to-tl from-[#1D2B64] to-[#F8CDDA] bg-clip-text text-transparent">
        Genarate Your custom QR code
      </p>
      <div className="flex flex-col-reverse md:flex-row  justify-center md:items-center gap-y-10 md:gap-10">
        <div className="relative">
          <textarea
            onChange={textChangeHandler}
            className="border border-white rounded-2xl h-50 md:h-100 w-full md:w-100 p-5 pb-10 focus:outline-none resize-none"
            maxLength={2000}
            placeholder="Enter Hare Your Text"
          />
          <p className="absolute bottom-1 right-3">{textLength}/2000</p>
        </div>
        <div className="border border-white rounded-2xl h-auto md:h-auto w-full md:w-100" ref={qrRef}>
          <QRCode
            className="h-full w-full rounded-2xl border-10 border-white"
            level="H"
            fgColor=""
            value={text}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={downloadQrCode} className="bg-blue-900 px-3 py-3 min-w-full md:min-w-[62%] rounded-xl mt-5 ">
          Download QR code
        </button>
      </div>
    </div>
  );
};

export default Front;

// 24212>23648
