// import * as React from "react";
import { useState } from "react";
import Logo from "../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../src/Firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

// interface INavBarProps {}

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
    <div className="md:mx-2 mx-5 justify-between flex my-5 md:justify-between md:items-center  w-full fixed top-0">
      <div className="flex gap-2 items-center">
        <img className="h-16 w-16" src={Logo} alt="Our logo" />
        <h1 className="text-primary font-semibold text-2xl">SCISSOR</h1>
      </div>
      <div className=" hidden md:flex gap-5 text-lg ">
        <NavLink to="#" className="hover:text-primary ">
          {" "}
          MyURLs{" "}
        </NavLink>
        <NavLink to="#" className="hover:text-primary ">
          {" "}
          Features{" "}
        </NavLink>
        <NavLink to="#" className="hover:text-primary ">
          {" "}
          Pricing
        </NavLink>
        <NavLink to="#" className="hover:text-primary ">
          {" "}
          Analytics{" "}
        </NavLink>
        <NavLink to="#" className="hover:text-primary ">
          {" "}
          FAQs
        </NavLink>
      </div>
      <div className="md:flex hidden  items-center   gap-4">
        <div className="md:flex flex-row justify-between">
          <button
            className="select-none rounded-lg border border-red-900  py-3 px-6 mx-2 text-center align-middle font-sans text-xs font-bold uppercase text-red-900  transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="w-6 h-6 text-white mr-2"
        onClick={toggleMenu}
      />

      {isMenuOpen && (
        <FontAwesomeIcon
          icon={faXmark}
          className="w-6 h-6 text-white mr-2"
          onClick={cancel}
        />
      )}
      {isMenuOpen && (
        <div className="md:hidden duration-300 transition-all w-full gap-2 items-center text-white font-medium flex flex-col px-10 py-10 bg-primary absolute left-0 top-0">
          <NavLink to="#" className="block hover:text-primary">
            MyURLs
          </NavLink>
          <NavLink to="#" className="block hover:text-primary">
            Features
          </NavLink>
          <NavLink to="#" className="block hover:text-primary">
            Pricing
          </NavLink>
          <NavLink to="#" className="block hover:text-primary">
            Analytics
          </NavLink>
          <NavLink to="#" className="block hover:text-primary">
            FAQs
          </NavLink>
          <div className="md:flex flex-row justify-between">
            <button
              className="select-none rounded-lg border border-red-900  py-3 px-6 mx-2 text-center align-middle font-sans text-xs font-bold uppercase text-red-900  transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
