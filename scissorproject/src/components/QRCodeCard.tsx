import React from "react";
import { useQRCode } from "../contexts/QRCodeContexts";

const QRCodeTable: React.FC = () => {
  const { qrCodes } = useQRCode();

  if (!qrCodes || qrCodes.length === 0) {
    return <p>No QR codes found.</p>;
  }

  return (
    <div className="bg-white rounded-lg">
      <h4 className="text-xl font-medium text-gray-700 mb-4">Your QR Codes</h4>
      {/* <div className="flex flex-col w-full"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {qrCodes.map((qrCode) => (
          <div
            key={qrCode.id}
            className="flex flex-row bg-white p-4 rounded-lg mb-4 items-center border border-gray-300"
          >
            <img
              src={qrCode.qrCodeData}
              alt="QR Code"
              className="w-32 h-32 max-w-xs"
              onError={(e) =>
                console.error("Failed to load image", e, qrCode.qrCodeData)
              }
            />
            <div className="ml-4">
              <p className="text-blue-500 hover:underline">
                <a
                  href={qrCode.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate block max-w-xs"
                  title={qrCode.originalUrl}
                >
                  {qrCode.originalUrl}
                </a>
              </p>
              <p className="text-gray-600 mt-2">
                Created At:{" "}
                {qrCode.createdAt
                  ? qrCode.createdAt.toDate().toISOString().split("T")[0]
                  : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRCodeTable;
