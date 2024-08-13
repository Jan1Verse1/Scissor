// src/pages/LoggedIn/ShortenIn.tsx
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addUrl } from "../Firestore-Function";
import { useUser } from "../contexts/UserContexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

interface FormData {
  url: string;
}

const ShortenIn: React.FC = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const shortenUrl = async (longUrl: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
      );
      if (!response.ok) throw new Error("Failed to fetch shortened URL.");
      return await response.text();
    } catch (err) {
      console.error("Error shortening URL:", err);
      throw new Error("Failed to shorten URL");
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setLoading(true);

    try {
      const shortUrl = await shortenUrl(data.url);
      setShortUrl(shortUrl);

      if (user) {
        await addUrl(user.uid, data.url, shortUrl);
      } else {
        console.log("User not logged in");
      }

      const shortCode = shortUrl.split("/").pop();
      if (shortCode) localStorage.setItem(shortCode, data.url);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
    reset();
  };

  const handleRedirect = () => {
    const shortCode = window.location.hash.substring(2);
    if (shortCode) {
      const longUrl = localStorage.getItem(shortCode);
      if (longUrl) window.location.href = longUrl;
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  if (!user) {
    return <p>Please log in to shorten URLs.</p>;
  }

  return (
    <div className="bg-white border-2 w-4/5 p-10 mb-16 rounded-3xl">
      <div className="flex flex-col mb-4">
        <h4 className="text-2xl font-medium text-gray-400">
          Shorten a long link
        </h4>
        <h6 className="text-4xl font-semibold">
          Provide us with your very long URL
        </h6>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Paste your long link here:
          </label>
          <input
            type="url"
            id="url"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your long URL here"
            {...register("url", {
              required: "URL is required.",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: "Invalid URL format.",
              },
            })}
          />
          {errors.url && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {errors.url.message as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-auto py-2 px-4 bg-violet-900 text-white font-semibold rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {shortUrl && (
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <p className="text-blue-500">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-500 underline"
            >
              {shortUrl}
            </a>
            <button
              className="ml-4 bg-violet-900 text-white rounded items-center p-2"
              onClick={() => {
                if (shortUrl) navigator.clipboard.writeText(shortUrl);
              }}
            >
              <FontAwesomeIcon
                icon={faCopy}
                className="w-6 h-6 text-white mr-2"
              />{" "}
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenIn;
