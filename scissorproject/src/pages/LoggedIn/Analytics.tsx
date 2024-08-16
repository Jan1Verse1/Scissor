// import React from "react";
import TopBar from "../../components/loginHeader";
import NavBar from "../../components/Nav";
import AnalyticsPage from "../../components/Analytics";

const Analytics = () => {
  return (
    <div className="flex flex-row  w-full min-h-screen ">
      <NavBar />
      <div className="flex flex-col  w-full min-h-screen">
        <TopBar />
        <div className="flex flex-col  p-6 w-full min-h-screen">
          <h1>Na your analytics</h1>
          <AnalyticsPage />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
