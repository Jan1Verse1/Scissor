import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db, Timestamp } from "../Firebase-config"; // Import Timestamp directly
import { useUser } from "./UserContexts";

interface QRCode {
  id: string;
  url: string;
  qrCodeData: string;
  originalUrl: string;
  createdAt: Timestamp; // Use Timestamp directly
}

interface QRCodeContextProps {
  qrCodes: QRCode[];
}

const QRCodeContext = createContext<QRCodeContextProps | undefined>(undefined);

export const QRCodeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const qrCodesRef = collection(db, "qrCodes");
    const q = query(qrCodesRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const qrCodesData: QRCode[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          qrCodesData.push({
            id: doc.id, // Use document ID as the QR code ID
            url: data.url,
            qrCodeData: data.qrCodeData,
            originalUrl: data.originalUrl,
            createdAt: data.createdAt, // This is now correctly typed as Timestamp
          });
        });
        setQrCodes(qrCodesData);
        setError(null);
      },
      (error) => {
        setError("Failed to fetch QR codes.");
        console.error("Error fetching QR codes:", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <QRCodeContext.Provider value={{ qrCodes }}>
      {error && <p className="text-red-600">{error}</p>}
      {children}
    </QRCodeContext.Provider>
  );
};

export const useQRCode = (): QRCodeContextProps => {
  const context = useContext(QRCodeContext);
  if (!context) {
    throw new Error("useQRCode must be used within a QRCodeProvider");
  }
  return context;
};
