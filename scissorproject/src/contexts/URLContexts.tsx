// src/contexts/URLContexts.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  UrlData,
  getUrlsForUser,
  deleteUrlFromFirestore,
} from "../Firestore-Function"; // Adjust the import path as needed
import { useUser } from "./UserContexts"; // Import the useUser hook

interface UrlsContextProps {
  urls: UrlData[];
  refetchUrls: (userId: string) => Promise<void>;
  deleteUrl: (id: string) => Promise<void>;
}

const UrlsContext = createContext<UrlsContextProps | undefined>(undefined);

export const UrlsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser(); // Get user from UserContext
  const [urls, setUrls] = useState<UrlData[]>([]);

  // Function to refetch URLs from Firestore for a given userId
  const refetchUrls = async (userId: string) => {
    try {
      const fetchedUrls = await getUrlsForUser(userId);
      setUrls(fetchedUrls);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  // Function to delete a URL from Firestore
  const deleteUrl = async (id: string) => {
    try {
      console.log("Calling deleteUrl with ID:", id); // Debugging line
      await deleteUrlFromFirestore(id);
      setUrls(urls.filter((url) => url.id !== id));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  // Fetch URLs on mount and when user changes
  React.useEffect(() => {
    if (user) {
      refetchUrls(user.uid);
    }
  }, [user]);

  return (
    <UrlsContext.Provider value={{ urls, refetchUrls, deleteUrl }}>
      {children}
    </UrlsContext.Provider>
  );
};

// Custom hook to use URLs context
export const useUrls = (): UrlsContextProps => {
  const context = useContext(UrlsContext);
  if (!context) {
    throw new Error("useUrls must be used within a UrlsProvider");
  }
  return context;
};
