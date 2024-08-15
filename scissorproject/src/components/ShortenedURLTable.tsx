import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUrls } from "../contexts/URLContexts";
import { useUser } from "../contexts/UserContexts";
import { UrlData } from "../Firestore-Function";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../Firebase-config";

const ShortenedUrlsTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urls, setUrls] = useState<UrlData[]>([]);
  const { deleteUrl } = useUrls();
  const { user } = useUser();

  useEffect(() => {
    console.log("Use Urls: " + useUrls);
  });

  useEffect(() => {
    if (!user) return;

    const urlsRef = collection(db, "urls");
    const q = query(urlsRef, where("userId", "==", user.uid));

    console.log("This is the user id: " + user.uid);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const urlsData: UrlData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate();
          console.log("Fetched document ID:", doc.id); // Debugging line
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
    alert("Shortened URL copied to clipboard!");
  };

  const handleDelete = async (id: string) => {
    console.log("handleDelete called with ID:", id); // Debugging line
    if (!id) {
      console.error("Invalid ID provided for deletion.");
      return;
    }
    try {
      await deleteUrl(id);
    } catch (err) {
      setError("Failed to delete URL.");
    }
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
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
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
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => handleCopy(url.shortenedUrl)}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => {
                    console.log("Let's delete a url:"); // Debugging line
                    console.log("Deleting URL with ID:", url.id); // Debugging line
                    handleDelete(url.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortenedUrlsTable;
