'use client'
import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
// import './qr-code.css'


function QrCodeGenerator({ url }) {
    const qrCodeRef = useRef(null);

    const downloadQRCode = () => {
        htmlToImage
            .toPng(qrCodeRef.current)
            .then(function (dataUrl) {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "qr-code.png";
                link.click();
            })
            .catch(function (error) {
                console.error("Error generating QR code:", error);
            });
    };

    return (
        <div className="mt-2 mx-auto">
            <div ref={qrCodeRef}>
                <div className="qr_code__box"  >
                    <QRCode className="bg-white" value={url} size={300} />
                </div>
                <p className="font-semibold mt-3 text-center">🔎 Scan me to to access Food Menu.</p>
            </div>

            <button onClick={downloadQRCode} className="btn btn-primary mt-5 mx-auto">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                </span>Download QR Code
            </button>
        </div>
    );
}

export default QrCodeGenerator;
