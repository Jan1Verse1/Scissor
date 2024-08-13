import React from "react";
import { useQRCode } from "../contexts/QRCodeContexts"; // Adjust the import path as needed

const QRCodeTable: React.FC = () => {
  const { qrCodes } = useQRCode();

  if (!qrCodes || qrCodes.length === 0) {
    return <p>No QR codes found.</p>;
  }

  return (
    <div className="bg-white border-2 p-6 rounded-lg">
      <h4 className="text-xl font-medium text-gray-700 mb-4">Your QR Codes</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {qrCodes.map((qrCode, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-300"
          >
            <h5 className="text-lg font-semibold mb-2">QR Code for URL:</h5>
            {/* Log and display the QR code data for debugging */}
            <p>{qrCode.qrCodeData}</p> {/* Remove this after debugging */}
            <img
              src={qrCode.qrCodeData}
              alt="QR Code"
              className="w-32 h-32 max-w-xs"
              onError={(e) =>
                console.error("Failed to load image", e, qrCode.qrCodeData)
              } // Log any errors in loading along with the data
            />
            {/* Hardcoded example for comparison */}
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
              alt="QR Code"
              className="w-32 h-32 max-w-xs"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRCodeTable;
