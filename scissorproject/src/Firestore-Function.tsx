// // src/firestoreService.ts
// import {
//   db,
//   collection,
//   addDoc,
//   query,
//   where,
//   getDocs,
// } from "./Firebase-config";

// import { doc, deleteDoc } from "firebase/firestore"; // Import deleteDoc from Firebase

// // Define types for the URL data
// export interface UrlData {
//   id: string;
//   userId: string;
//   originalUrl: string;
//   shortenedUrl: string;
//   createdAt: Date;
// }

// // Add a new URL to Firestore
// export const addUrl = async (
//   userId: string,
//   originalUrl: string,
//   shortenedUrl: string
// ): Promise<void> => {
//   try {
//     const newUrl: UrlData = {
//       userId,
//       originalUrl,
//       shortenedUrl,
//       createdAt: new Date(),
//       id: "",
//     };
//     await addDoc(collection(db, "urls"), newUrl);
//     console.log("URL added successfully");
//   } catch (error) {
//     console.error("Error adding URL:", error);
//     // Optionally, you could throw the error to let the calling function handle it
//     // throw error;
//   }
// };

// // Get URLs for a specific user
// export const getUrlsForUser = async (userId: string): Promise<UrlData[]> => {
//   try {
//     const urlsCollection = collection(db, "urls");
//     const q = query(urlsCollection, where("userId", "==", userId));
//     const querySnapshot = await getDocs(q);

//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       userId: doc.data().userId, // Make sure userId is included
//       originalUrl: doc.data().originalUrl,
//       shortenedUrl: doc.data().shortenedUrl,
//       createdAt: doc.data().createdAt.toDate(), // Ensure the date is in Date format
//     }));
//   } catch (error) {
//     console.error("Error fetching URLs:", error);
//     throw new Error("Failed to fetch URLs.");
//   }
// };

// // Function to save QR code data
// export const saveQRCode = async (
//   userId: string,
//   originalUrl: string,
//   qrCodeData: string
// ) => {
//   try {
//     const qrCodesCollection = collection(db, "qrCodes");
//     await addDoc(qrCodesCollection, {
//       userId,
//       originalUrl,
//       qrCodeData,
//       createdAt: new Date(),
//     });
//     console.log("QR code saved successfully.");
//   } catch (error) {
//     console.error("Error saving QR code: ", error);
//     throw new Error("Failed to save QR code.");
//   }
// };

// //Function to delete a URL by its ID
// export const deleteUrlFromFirestore = async (id: string): Promise<void> => {
//   try {
//     console.log("Deleting URL with ID:", id); // Debugging line
//     if (!id) {
//       throw new Error("Invalid ID provided");
//     }
//     const urlDoc = doc(db, "urls", id);
//     await deleteDoc(urlDoc);
//     console.log("URL deleted successfully.");
//   } catch (error) {
//     console.error("Error deleting URL:", error);
//     throw new Error("Failed to delete URL.");
//   }
// };

// // Get user's QR Codes
// export const getQRcodesForUser = async (userId: string) => {
//   try {
//     const qrCodesRef = collection(db, "qrCodes"); // Your Firestore collection name
//     const querySnapshot = await getDocs(qrCodesRef);
//     const qrCodes = querySnapshot.docs
//       .map((doc) => ({ id: doc.id, ...doc.data() }))
//       .filter((qrCode: any) => qrCode.userId === userId)
//       .map((qrCode: any) => ({
//         url: qrCode.url,
//         qrCodeData: qrCode.qrCodeData,
//       }));
//     return qrCodes;
//   } catch (err) {
//     console.error("Error fetching QR codes:", err);
//     throw new Error("Failed to fetch QR codes");
//   }
// };

// src/firestoreService.ts
import {
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  increment,
  arrayUnion,
} from "./Firebase-config";

import { deleteDoc } from "firebase/firestore"; // Import deleteDoc from Firebase

// Define types for the URL data
export interface UrlData {
  id: string;
  userId: string;
  originalUrl: string;
  shortenedUrl: string;
  createdAt: Date;
  clickCount: number;
  trafficSources: string[]; // Stores sources (e.g., "Google", "Facebook")
}

// Add a new URL to Firestore
export const addUrl = async (
  userId: string,
  originalUrl: string,
  shortenedUrl: string
): Promise<void> => {
  try {
    const newUrl: UrlData = {
      id: "",
      userId,
      originalUrl,
      shortenedUrl,
      createdAt: new Date(),
      clickCount: 0, // Initialize click count
      trafficSources: [], // Initialize traffic sources
    };
    await addDoc(collection(db, "urls"), newUrl);
    console.log("URL added successfully");
  } catch (error) {
    console.error("Error adding URL:", error);
    throw error;
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
      userId: doc.data().userId,
      originalUrl: doc.data().originalUrl,
      shortenedUrl: doc.data().shortenedUrl,
      createdAt: doc.data().createdAt.toDate(),
      clickCount: doc.data().clickCount || 0, // Retrieve click count
      trafficSources: doc.data().trafficSources || [], // Retrieve traffic sources
    }));
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Failed to fetch URLs.");
  }
};

// Track a click on a shortened URL
export const trackUrlClick = async (
  urlId: string,
  source: string
): Promise<void> => {
  try {
    const urlDocRef = doc(db, "urls", urlId);
    await updateDoc(urlDocRef, {
      clickCount: increment(1), // Increment click count by 1
      trafficSources: arrayUnion(source), // Add source to the array
    });
    console.log("URL click tracked successfully.");
  } catch (error) {
    console.error("Error tracking URL click:", error);
    throw new Error("Failed to track URL click.");
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
      clickCount: 0, // Initialize click count for QR codes
      trafficSources: [], // Initialize traffic sources
    });
    console.log("QR code saved successfully.");
  } catch (error) {
    console.error("Error saving QR code: ", error);
    throw new Error("Failed to save QR code.");
  }
};

// Get user's QR Codes
export const getQRcodesForUser = async (userId: string) => {
  try {
    const qrCodesRef = collection(db, "qrCodes");
    const querySnapshot = await getDocs(qrCodesRef);
    const qrCodes = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((qrCode: any) => qrCode.userId === userId)
      .map((qrCode: any) => ({
        id: qrCode.id,
        url: qrCode.originalUrl,
        qrCodeData: qrCode.qrCodeData,
        clickCount: qrCode.clickCount || 0, // Retrieve click count
        trafficSources: qrCode.trafficSources || [], // Retrieve traffic sources
      }));
    return qrCodes;
  } catch (err) {
    console.error("Error fetching QR codes:", err);
    throw new Error("Failed to fetch QR codes");
  }
};

// Function to track QR code scans
export const trackQRCodeScan = async (
  qrCodeId: string,
  source: string
): Promise<void> => {
  try {
    const qrCodeDocRef = doc(db, "qrCodes", qrCodeId);
    await updateDoc(qrCodeDocRef, {
      clickCount: increment(1), // Increment scan count by 1
      trafficSources: arrayUnion(source), // Add source to the array
    });
    console.log("QR code scan tracked successfully.");
  } catch (error) {
    console.error("Error tracking QR code scan:", error);
    throw new Error("Failed to track QR code scan.");
  }
};

// Function to delete a URL by its ID
export const deleteUrlFromFirestore = async (id: string): Promise<void> => {
  try {
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
