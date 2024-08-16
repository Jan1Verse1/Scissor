import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../contexts/UserContexts";
import { UrlData } from "../Firestore-Function";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../Firebase-config";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 10; // Number of items per page

const ShortenedUrlsTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page state

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const urlsRef = collection(db, "urls");
    const q = query(urlsRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const urlsData: UrlData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate();
          urlsData.push({ id: doc.id, ...data, createdAt } as UrlData);
        });
        setUrls(urlsData);
        setLoading(false);
      },
      () => {
        setError("Failed to fetch URLs.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Shortened URL copied to clipboard!", {
      position: "top-right" as ToastPosition,
    });
  };

  // Calculate the indexes for slicing
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUrls = urls.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Long URL</th>
            <th className="px-4 py-2 border-b">Shortened URL</th>
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedUrls.map((url) => (
            <tr key={url.id}>
              <td className="px-4 py-2 border-b">
                {url.createdAt
                  ? url.createdAt.toISOString().split("T")[0]
                  : "N/A"}
              </td>
              <td className="px-4 py-2 border-b max-w-xs truncate">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.originalUrl}
                </a>
              </td>
              <td className="px-4 py-2 border-b max-w-xs truncate">
                <a
                  href={url.shortenedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.shortenedUrl}
                </a>
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  className="text-violet-500 hover:text-blue-900"
                  onClick={() => handleCopy(url.shortenedUrl)}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-violet-500 text-white rounded-l-md "
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {Math.ceil(urls.length / ITEMS_PER_PAGE)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * ITEMS_PER_PAGE >= urls.length}
          className="px-4 py-2 bg-violet-500 text-white rounded-r-md "
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ShortenedUrlsTable;
