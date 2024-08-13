// src/firestoreService.ts
import {
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "./Firebase-config";

import { doc, deleteDoc } from "firebase/firestore"; // Import deleteDoc from Firebase

// Define types for the URL data
export interface UrlData {
  id: string;
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
      id: "",
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
export const getUrlsForUser = async (userId: string): Promise<UrlData[]> => {
  try {
    const urlsCollection = collection(db, "urls");
    const q = query(urlsCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      userId: doc.data().userId, // Make sure userId is included
      originalUrl: doc.data().originalUrl,
      shortenedUrl: doc.data().shortenedUrl,
      createdAt: doc.data().createdAt.toDate(), // Ensure the date is in Date format
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

// Function to delete a URL by its ID
export const deleteUrlFromFirestore = async (id: string): Promise<void> => {
  try {
    console.log("Deleting URL with ID:", id); // Debugging line
    if (!id) {
      throw new Error("Invalid ID provided");
    }
    const urlDoc = doc(db, "urls", id);
    await deleteDoc(urlDoc);
    console.log("URL deleted successfully.");
  } catch (error) {
    console.error("Error deleting URL:", error);
    throw new Error("Failed to delete URL.");
  }
};

// Get user's QR Codes
export const getQRcodesForUser = async (userId: string) => {
  try {
    const qrCodesRef = collection(db, "qrCodes"); // Your Firestore collection name
    const querySnapshot = await getDocs(qrCodesRef);
    const qrCodes = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((qrCode: any) => qrCode.userId === userId)
      .map((qrCode: any) => ({
        url: qrCode.url,
        qrCodeData: qrCode.qrCodeData,
      }));
    return qrCodes;
  } catch (err) {
    console.error("Error fetching QR codes:", err);
    throw new Error("Failed to fetch QR codes");
  }
};
