// import React from "react";
import TopBar from "../../components/loginHeader";
import NavBar from "../../components/Nav";
import QRCodeMaker from "../../components/QRCodeGen";
import ShortenedUrlsTable from "../../components/ShortenedURLTable";

const QRCode = () => {
  return (
    <div className="flex flex-row  w-full min-h-screen ">
      <NavBar />
      <div className="flex flex-col  w-full min-h-screen">
        <TopBar />
        <div className="flex flex-col  p-6 w-full min-h-screen">
          <div className="flex w-full border-red-300">
            <QRCodeMaker />
          </div>
          <div>
            <ShortenedUrlsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
