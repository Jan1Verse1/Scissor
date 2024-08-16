import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useForm, SubmitHandler } from "react-hook-form";
import VideoBG from "../../assets/7296058-uhd_2160_4096_30fps.mp4";
import { Link } from "react-router-dom";
import { auth } from "../../../src/Firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the form data type
interface FormData {
  email: string;
}

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.success("Password reset email sent!", {
          position: "top-right" as ToastPosition,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error resetting password:", errorMessage);
        toast.error(`Error resetting password: ${errorMessage}`, {
          position: "top-right" as ToastPosition,
        });
      });
  };

  const SignUp = "/SignUp";

  return (
    <div className="flex flex-col py-20 w-auto min-h-screen">
      <Header />
      <div className="grid grid-cols-2 gap-8 p-8 m-7 items-center overflow-hidden">
        <div className="flex items-center justify-center p-4 max-w-lg h-[560px]">
          <video
            className="rounded-[10px] border border-blue-500 w-full h-full object-cover"
            src={VideoBG}
            autoPlay
            loop
            muted
          ></video>
        </div>
        <div className="flex flex-col p-3">
          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
          <p className="text-base font-normal mb-4">
            Kindly provide your email address to reset your password.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address:
              </label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Email Address"
                {...register("email", {
                  required: "Email Address is required.",
                  pattern: {
                    value: emailRegex,
                    message: "Invalid Email Address.",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-auto py-2 px-4 bg-violet-900 text-white font-semibold rounded-md hover:bg-violet-500"
            >
              Reset Password
            </button>
          </form>
          <div>
            <p className="mb-4 mt-4">
              Remember your password?{" "}
              <Link className=" text-violet-900" to="/SignIn">
                Sign In here
              </Link>
            </p>
            <p className="mb-4">
              Don't have an account?{" "}
              <Link className=" text-violet-900" to={SignUp}>
                Sign Up here
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default PasswordReset;
