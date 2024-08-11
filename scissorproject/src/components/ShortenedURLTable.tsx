import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getUrlsForUser } from "../Firestore-Function"; // Adjust the path as needed
import { Timestamp } from "firebase/firestore"; // Import Timestamp

interface UrlData {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  createdAt: Timestamp; // Adjust if createdAt is Date
}

const ShortenedUrlsTable = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const userId = "user-id"; // Replace with actual user ID
        const fetchedUrls = await getUrlsForUser(userId);
        console.log(`fetchUrls - ${fetchedUrls}`);

        // Map the fetched data to UrlData format
        const formattedUrls = fetchedUrls.map((doc: any) => ({
          id: doc.id,
          originalUrl: doc.data().originalUrl,
          shortenedUrl: doc.data().shortenedUrl,
          createdAt: doc.data().createdAt,
        }));

        setUrls(formattedUrls);
      } catch (error) {
        setError("Failed to load URLs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    alert("Shortened URL copied to clipboard!");
  };

  const handleDelete = (id: string) => {
    setUrls(urls.filter((url) => url.id !== id));
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
                {url.createdAt.toDate().toISOString().split("T")[0]}
              </td>
              <td className="px-4 py-2 border-b">{url.originalUrl}</td>
              <td className="px-4 py-2 border-b">
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
                  onClick={() => handleDelete(url.id)}
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
