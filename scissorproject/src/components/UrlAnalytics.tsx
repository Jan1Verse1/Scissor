// src/components/UrlAnalytics.tsx
import React from "react";
import { useUrls } from "../contexts/URLContexts";

const UrlAnalytics: React.FC = () => {
  const { urls } = useUrls();

  // Utility function to truncate a string
  const truncateUrl = (url: string, maxLength: number) => {
    return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">URL Analytics</h2>
      {urls.length === 0 ? (
        <p>No URL analytics available.</p>
      ) : (
        <div className="space-y-4">
          {urls.map((url) => (
            <div key={url.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">
                Shortened URL: {url.shortenedUrl}
              </h3>
              <p className="text-gray-600">
                Original URL: {truncateUrl(url.originalUrl, 50)}
              </p>
              <p className="text-gray-600">Clicks: {url.clickCount}</p>
              <div className="mt-2">
                <h4 className="font-medium">Traffic Sources:</h4>
                {url.trafficSources.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {url.trafficSources.map((source, index) => (
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

export default UrlAnalytics;
