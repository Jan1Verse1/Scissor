import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { auth } from "../../src/Firebase-config";

const LoginHeader = () => {
  const [nav, setNav] = useState(false);
  const toggleNav = () => {
    setNav(!nav);
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
    <div>
      <header className="flex flex-row justify-between align-middle px-4 py-4  bg-white border-2 border-gray-800 h-auto w-full fixed top-0">
        <div className="flex flex-row justify-between w-full">
          <div>
            <img className="h-16 w-16" src={Logo} alt="Our logo" />
          </div>
          <div className="md:flex flex-row justify-between">
            <button
              className="select-none rounded-lg border border-violet-900  py-3 px-6 mx-2 text-center align-middle font-sans text-xs font-bold uppercase text-violet-900  transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleLogout}
            >
              Log Out
            </button>
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
            className="select-none rounded-lg border border-violet-900  py-3 px-6 mx-2 text-center align-middle font-sans text-xs font-bold uppercase text-violet-900  transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </ul>
      </div>
    </div>
  );
};

export default LoginHeader;
