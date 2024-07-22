import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useForm, SubmitHandler } from "react-hook-form";
import VideoBG from "../../assets/7296058-uhd_2160_4096_30fps.mp4";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../src/Firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the form data type
interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/Dashboard");
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
        navigateHandler();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        // alert(errorMessage);
        toast.error(`Error signin you in: ${errorMessage}`, {
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
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <p className="text-base font-normal mb-4">
            Kindly provide required details to sign into your account
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
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required.",
                })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-auto py-2 px-4 bg-violet-900 text-white font-semibold rounded-md hover:bg-violet-500"
            >
              Sign In
            </button>
          </form>
          <div>
            <p>
              Don't have an account? <Link to={SignUp}> Sign Up here</Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
