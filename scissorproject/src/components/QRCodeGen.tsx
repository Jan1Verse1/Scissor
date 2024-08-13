import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth"; // Import Firebase Auth functions
import { saveQRCode } from "../Firestore-Function"; // Import Firestore function

interface FormData {
  url: string;
}

const QRCodeMaker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null); // State to track the logged-in user

  const auth = getAuth(); // Initialize Firebase Auth

  // Set up an auth state listener to track the logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current user:", currentUser); // Log the current user
    });
    return () => unsubscribe();
  }, [auth]);

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setLoading(true);

    try {
      // Generate QR code
      setQrCodeUrl(data.url);

      if (user) {
        // Save the QR code to Firestore
        const qrCodeData = `data:image/svg+xml;base64,${btoa(
          new XMLSerializer().serializeToString(document.querySelector("svg")!)
        )}`; // Get QR code SVG as base64 string
        await saveQRCode(user.uid, data.url, qrCodeData);
      } else {
        console.log("User not logged in");
      }
    } catch (err) {
      setError("Failed to generate or save QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 w-4/5 p-10 mb-16 rounded-3xl">
      <div className="flex flex-col mb-4">
        <h4 className="text-2xl font-medium text-gray-400">
          Generate a QR Code
        </h4>
        <h6 className="text-4xl font-semibold">
          Provide us with your URL to generate a QR Code
        </h6>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Enter your URL here:
          </label>
          <input
            type="url"
            id="url"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your URL here"
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
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {qrCodeUrl && (
        <div className="mt-4 flex flex-col items-center">
          <div className="mb-4">
            <QRCodeSVG value={qrCodeUrl} size={256} /> {/* Generate QR code */}
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeMaker;
