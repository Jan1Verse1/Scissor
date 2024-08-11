import { useEffect, useState } from "react";
import { auth } from "../Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";

const TopBar = () => {
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        if (email) {
          setUserInitial(email.charAt(0).toUpperCase());
        }
      } else {
        setUserInitial(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Map the current path to a title
    switch (location.pathname) {
      case "/myurls":
        setPageTitle("My URLs");
        break;
      case "/qrcode":
        setPageTitle("QR Codes");
        break;
      case "/analytics":
        setPageTitle("Analytics");
        break;
      case "/faqs":
        setPageTitle("FAQs");
        break;
      default:
        setPageTitle("My URLs"); // Default page title
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-row justify-between align-middle px-4 py-4 bg-white border-2 border-b-gray-100 h-auto w-full">
      <div className="text-xl font-semibold text-gray-800">{pageTitle}</div>
      {userInitial ? (
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl-custom font-bold">
          {userInitial}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TopBar;
