// import React from "react";
import TopBar from "../../components/loginHeader";
import NavBar from "../../components/Nav";

const Dashboard = () => {
  return (
    <div className="flex flex-row px-60 w-full min-h-screen ">
      <NavBar />
      <div>
        <NavBar />
        <TopBar />
        <h1>This is the Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
