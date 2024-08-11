// src/firestoreService.ts
import {
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "./Firebase-config";

// Define types for the URL data
interface UrlData {
  userId: string;
  originalUrl: string;
  shortenedUrl: string;
  createdAt: Date;
}

// Add a new URL to Firestore
export const addUrl = async (
  userId: string,
  originalUrl: string,
  shortenedUrl: string
): Promise<void> => {
  try {
    const newUrl: UrlData = {
      userId,
      originalUrl,
      shortenedUrl,
      createdAt: new Date(),
    };
    await addDoc(collection(db, "urls"), newUrl);
    console.log("URL added successfully");
  } catch (error) {
    console.error("Error adding URL:", error);
    // Optionally, you could throw the error to let the calling function handle it
    // throw error;
  }
};

// Get URLs for a specific user
export const getUrlsForUser = async (userId: string) => {
  try {
    const urlsCollection = collection(db, "urls");
    const q = query(urlsCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Failed to fetch URLs.");
  }
};

// Function to save QR code data
export const saveQRCode = async (
  userId: string,
  originalUrl: string,
  qrCodeData: string
) => {
  try {
    const qrCodesCollection = collection(db, "qrCodes");
    await addDoc(qrCodesCollection, {
      userId,
      originalUrl,
      qrCodeData,
      createdAt: new Date(),
    });
    console.log("QR code saved successfully.");
  } catch (error) {
    console.error("Error saving QR code: ", error);
    throw new Error("Failed to save QR code.");
  }
};
