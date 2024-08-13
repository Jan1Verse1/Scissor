import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../Firebase-config"; // Import your Firestore configuration
import { useUser } from "./UserContexts"; // Import the useUser hook

interface QRCode {
  url: string;
  qrCodeData: string;
}

interface QRCodeContextProps {
  qrCodes: QRCode[];
}

const QRCodeContext = createContext<QRCodeContextProps | undefined>(undefined);

export const QRCodeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser(); // Get user from UserContext
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const qrCodesRef = collection(db, "qrCodes"); // Assuming qrCodes is the collection name
    const q = query(qrCodesRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const qrCodesData: QRCode[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          qrCodesData.push({
            url: data.url,
            qrCodeData: data.qrCodeData,
          });
        });
        setQrCodes(qrCodesData);
        setError(null); // Clear any previous error
      },
      (error) => {
        setError("Failed to fetch QR codes.");
        console.error("Error fetching QR codes:", error);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  return (
    <QRCodeContext.Provider value={{ qrCodes }}>
      {error && <p className="text-red-600">{error}</p>}
      {children}
    </QRCodeContext.Provider>
  );
};

// Custom hook to use QRCode context
export const useQRCode = (): QRCodeContextProps => {
  const context = useContext(QRCodeContext);
  if (!context) {
    throw new Error("useQRCode must be used within a QRCodeProvider");
  }
  return context;
};
