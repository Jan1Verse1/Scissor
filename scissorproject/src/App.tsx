import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import SignIn from "./pages/Signin/SignIn";
import SignUp from "./pages/Signin/SignUp";
import Dashboard from "../src/pages/LoggedIn/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
