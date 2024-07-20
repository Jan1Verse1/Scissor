import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.svg";

const Header = () => {
  const [nav, setNav] = useState(false);
  const toggleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/");
  };

  const navigateSignIn = () => {
    navigate("/SignIn");
  };

  const navigateSignUp = () => {
    navigate("/SignUp");
  };
  return (
    <div>
      <header className="flex flex-row justify-between align-middle px-4 py-4  bg-white border-2 border-gray-800 h-auto w-full fixed top-0">
        <div className="flex flex-row justify-between w-full">
          <div>
            <img
              className="h-16 w-16"
              src={Logo}
              alt="Our logo"
              onClick={navigateHandler}
            />
          </div>
          <div className="md:flex flex-row justify-between">
            <button
              className="select-none rounded-lg bg-violet-900  py-3 px-6 mx-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={navigateSignUp}
            >
              Sign Up
            </button>
            <button
              className="select-none rounded-lg border border-violet-900  py-3 px-6 mx-2 text-center align-middle font-sans text-xs font-bold uppercase text-violet-900  transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={navigateSignIn}
            >
              Sign In
            </button>
            <div>
              {/* Uncomment and correct the import to use FontAwesomeIcon  */}
              <FontAwesomeIcon
                // size={40}
                color="#162A87"
                className="flex my-4 md:hidden"
                onClick={toggleNav}
                icon={faHouse}
              />
            </div>
          </div>
        </div>
      </header>

      <div>
        <ul
          className={
            nav
              ? "flex flex-col md:hidden fixed top-20 p-4 h-max w-full text-center text-white rounded-md bg-white z-20"
              : "hidden"
          }
        >
          <button
            className="select-none rounded-lg bg-violet-900   py-3 px-6 mx-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={navigateSignUp}
          >
            Sign Up
          </button>
          <button
            className="select-none rounded-lg border border-violet-900  py-3 px-6 mx-2 text-center align-middle font-sans text-xs font-bold uppercase text-violet-900  transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={navigateSignIn}
          >
            Sign In
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
