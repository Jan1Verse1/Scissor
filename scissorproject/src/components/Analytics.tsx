// src/pages/AnalyticsPage.tsx
import React from "react";
import UrlAnalytics from "../components/UrlAnalytics";
import QRCodeAnalytics from "../components/QRCodeAnalytics";

const AnalyticsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UrlAnalytics />
        <QRCodeAnalytics />
      </div>
    </div>
  );
};

export default AnalyticsPage;
