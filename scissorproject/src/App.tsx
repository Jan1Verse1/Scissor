import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import SignIn from "./pages/Signin/SignIn";
import SignUp from "./pages/Signin/SignUp";
import Dashboard from "../src/pages/LoggedIn/Dashboard";
import FAQs from "../src/pages/LoggedIn/FAQs";
import Analytics from "../src/pages/LoggedIn/Analytics";
import QRCode from "../src/pages/LoggedIn/QRCodes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="myURLs" element={<Dashboard />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="qrcode" element={<QRCode />} />
      </Routes>
    </Router>
  );
};

export default App;
