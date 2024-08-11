import { useState } from "react";
import Logo from "../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../src/Firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faChartSimple,
  faCircleQuestion,
  faQrcode,
  faLink,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cancel = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out");
        navigate("/"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    // fixed top-0 left-0 h-full
    <div className="flex flex-row  w-1/4 h-screen border-2 border-l-gray-950 p-2">
      <div
        className={`h-full  text-black p-5 transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-50 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-row gap-2 items-center">
            <img className="h-16 w-16" src={Logo} alt="Our logo" />
            <h1 className="text-gray-800 font-semibold text-2xl">SCISSOR</h1>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            className="w-6 h-6 text-white md:hidden"
            onClick={cancel}
          />
        </div>
        <div className="flex flex-col gap-5 text-lg flex-grow">
          <NavLink to="/myURLs" className="hover:text-gray-300">
            <FontAwesomeIcon
              icon={faLink}
              className="w-6 h-6 text-violet-900  mr-8"
            />
            MyURLs
          </NavLink>
          <NavLink to="/qrcode" className="hover:text-gray-300">
            <FontAwesomeIcon
              icon={faQrcode}
              className="w-6 h-6 text-violet-900  mr-8"
            />
            QR Codes
          </NavLink>
          <NavLink to="/analytics" className="hover:text-gray-300">
            <FontAwesomeIcon
              icon={faChartSimple}
              className="w-6 h-6 text-violet-900  mr-8"
            />
            Analytics
          </NavLink>
          <NavLink to="/faqs" className="hover:text-gray-300">
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="w-6 h-6 text-violet-900  mr-8"
            />
            FAQs
          </NavLink>
        </div>
        <div className="mt-auto">
          <button
            className="select-none rounded-lg  py-3 px-6 mt-6 w-full text-center align-middle font-sans text-xs font-bold uppercase text-red-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="w-6 h-6 text-crimson  mr-8"
            />
            Log Out
          </button>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="w-6 h-6 text-primary m-5 md:hidden"
        onClick={toggleMenu}
      />
    </div>
  );
};

export default NavBar;
