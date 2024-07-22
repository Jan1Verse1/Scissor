import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

interface FormData {
  url: string;
}

const ShortenInHome = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  // Function to generate a short code
  const generateShortCode = (): string => {
    return Math.random().toString(36).substring(2, 8);
  };

  // Function to save URL mapping to localStorage
  const saveUrlMapping = (shortCode: string, longUrl: string) => {
    localStorage.setItem(shortCode, longUrl);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const shortCode = generateShortCode();
    saveUrlMapping(shortCode, data.url);
    setShortUrl(`${window.location.origin}/#/${shortCode}`);
  };

  // Handle redirects if short code exists
  const handleRedirect = () => {
    const shortCode = window.location.hash.substring(2);
    if (shortCode) {
      const longUrl = localStorage.getItem(shortCode);
      if (longUrl) {
        window.location.href = longUrl;
      }
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  // Navigate to Sign Up page
  const navigateSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="flex flex-col w-auto items-center h-auto bg-black mb-16 p-10">
      <div className="flex flex-col items-center mb-12">
        <h4 className="text-violet-400 text-3xl font-semibold">
          Try our URL Shortener out
        </h4>
        <h1 className="text-white text-6xl text-center font-extrabold">
          Sign up for a free account and <br /> gain access to all our features
        </h1>
      </div>

      <div className="bg-white border-2 w-4/5 p-10 rounded-3xl">
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
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4">
            <p className="text-green-600">Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button
              className="ml-4 bg-violet-900 text-white rounded items-center p-2"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
              <FontAwesomeIcon
                icon={faCopy}
                className="w-6 h-6 text-white mr-2"
              />
              Copy
            </button>
          </div>
        )}
      </div>
      <h4
        className="text-white text-3xl font-semibold mt-6 cursor-pointer"
        onClick={navigateSignUp}
      >
        Click here to <span className="italic">Sign Up</span> for your free
        account
      </h4>
    </div>
  );
};

export default ShortenInHome;
