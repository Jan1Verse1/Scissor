// import React from "react";
// import LoginHeader from "../../components/loginHeader";
import NavBar from "../../components/Nav";

const Dashboard = () => {
  return (
    <div className="flex flex-col py-44 w-auto min-h-screen ">
      {/* <LoginHeader /> */}
      <NavBar />
      <div>
        <h1>This is the Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
