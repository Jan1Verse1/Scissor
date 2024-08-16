import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../Firebase-config";
import { useUser } from "./UserContexts";
import { trackQRCodeScan } from "../Firestore-Function"; // Import the tracking function

interface QRCode {
  id: string;
  url: string;
  qrCodeData: string;
  originalUrl: string;
  createdAt: any; // Use any for simplicity if Timestamp is directly imported
  clickCount: number;
  trafficSources: string[];
}

interface QRCodeContextProps {
  qrCodes: QRCode[];
  handleQRCodeScan: (qrCodeId: string, source: string) => Promise<void>; // New function to handle QR code scans
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
            id: doc.id,
            url: data.url,
            qrCodeData: data.qrCodeData,
            originalUrl: data.originalUrl,
            createdAt: data.createdAt,
            clickCount: data.clickCount || 0,
            trafficSources: data.trafficSources || [],
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

  // Function to handle QR code scan tracking
  const handleQRCodeScan = async (qrCodeId: string, source: string) => {
    try {
      await trackQRCodeScan(qrCodeId, source);
      // Optionally, update the local state to reflect the new scan count
      setQrCodes((prevQRcodes) =>
        prevQRcodes.map((qrCode) =>
          qrCode.id === qrCodeId
            ? {
                ...qrCode,
                clickCount: qrCode.clickCount + 1,
                trafficSources: [...qrCode.trafficSources, source],
              }
            : qrCode
        )
      );
    } catch (error) {
      console.error("Error tracking QR code scan:", error);
    }
  };

  return (
    <QRCodeContext.Provider value={{ qrCodes, handleQRCodeScan }}>
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
