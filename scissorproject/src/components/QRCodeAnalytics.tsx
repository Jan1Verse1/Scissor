// src/components/QRCodeAnalytics.tsx
import React from "react";
import { useQRCode } from "../contexts/QRCodeContexts";

const QRCodeAnalytics: React.FC = () => {
  const { qrCodes } = useQRCode();

  // Utility function to truncate a string
  const truncateUrl = (url: string, maxLength: number) => {
    return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">QR Code Analytics</h2>
      {qrCodes.length === 0 ? (
        <p>No QR code analytics available.</p>
      ) : (
        <div className="space-y-4">
          {qrCodes.map((qrCode) => (
            <div key={qrCode.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">
                Original URL: {truncateUrl(qrCode.originalUrl, 50)}
              </h3>
              <p className="text-gray-600">Scans: {qrCode.clickCount}</p>
              <div className="mt-2">
                <h4 className="font-medium">Traffic Sources:</h4>
                {qrCode.trafficSources.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {qrCode.trafficSources.map((source, index) => (
                      <li key={index}>{source}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No traffic sources recorded.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QRCodeAnalytics;
