import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  UrlData,
  getUrlsForUser,
  deleteUrlFromFirestore,
  trackUrlClick, // Import the tracking function
} from "../Firestore-Function"; // Adjust the import path as needed
import { useUser } from "./UserContexts";

interface UrlsContextProps {
  urls: UrlData[];
  refetchUrls: (userId: string) => Promise<void>;
  deleteUrl: (id: string) => Promise<void>;
  handleUrlClick: (urlId: string, source: string) => Promise<void>; // New function to handle URL clicks
}

const UrlsContext = createContext<UrlsContextProps | undefined>(undefined);

export const UrlsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [urls, setUrls] = useState<UrlData[]>([]);

  const refetchUrls = async (userId: string) => {
    try {
      const fetchedUrls = await getUrlsForUser(userId);
      setUrls(fetchedUrls);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      await deleteUrlFromFirestore(id);
      setUrls(urls.filter((url) => url.id !== id));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  // Function to handle URL click tracking
  const handleUrlClick = async (urlId: string, source: string) => {
    try {
      await trackUrlClick(urlId, source);
      // Optionally, you could update the click count locally to avoid refetching
      setUrls((prevUrls) =>
        prevUrls.map((url) =>
          url.id === urlId
            ? {
                ...url,
                clickCount: url.clickCount + 1,
                trafficSources: [...url.trafficSources, source],
              }
            : url
        )
      );
    } catch (error) {
      console.error("Error tracking URL click:", error);
    }
  };

  React.useEffect(() => {
    if (user) {
      refetchUrls(user.uid);
    }
  }, [user]);

  return (
    <UrlsContext.Provider
      value={{ urls, refetchUrls, deleteUrl, handleUrlClick }}
    >
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
