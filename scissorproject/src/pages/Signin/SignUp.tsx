import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useForm, SubmitHandler } from "react-hook-form";
import VideoBG from "../../assets/7296058-uhd_2160_4096_30fps.mp4";
import { Link } from "react-router-dom";
import { auth } from "../../../src/Firebase-config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

// Define the form data type
interface FormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed up:", user);

        // Send verification email
        sendEmailVerification(user)
          .then(() => {
            console.log("Verification email sent.");
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  const SignIn = "/SignIn";

  return (
    <div className="flex flex-col py-20 w-auto min-h-screen">
      <Header />
      <div className="p-8 flex flex-row m-7 overflow-hidden ">
        <div className="col-span-1 flex items-center justify-center p-4 max-w-lg h-[560px]">
          <video
            className="rounded-[10px] border border-blue-500"
            src={VideoBG}
            autoPlay
            loop
            muted
          ></video>
        </div>
        <div className="flex flex-col p-3">
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          <p className="text-base font-normal mb-4">
            Kindly provide required details to sign up
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
                placeholder="Set your password"
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
              className="w-full py-2 px-4 bg-violet-900 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
          <div>
            <p>
              Already have an account? <Link to={SignIn}> Sign In here</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
