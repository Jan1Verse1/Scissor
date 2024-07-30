// Dashboard.tsx
import { useEffect, useState } from "react";
import { auth } from "../Firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const TopBar = () => {
  const [userInitial, setUserInitial] = useState<string | null>(null);

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

  return (
    <div className="flex flex-row justify-between align-middle px-4 py-4  bg-white border-2 border-b-gray-950  h-auto w-full fixed top-0">
      {userInitial ? (
        // <div className="user-initial">
        //   <span>{userInitial}</span>
        // </div>
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
