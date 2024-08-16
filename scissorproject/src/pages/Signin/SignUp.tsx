import React, { useState } from "react";
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
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the form data type
interface FormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checkPasswordCriteria = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setPasswordCriteria({
      hasUppercase,
      hasNumber,
      hasSpecialChar,
    });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed up:", user);

        toast.success("User signed up successfully!", {
          position: "top-right" as ToastPosition,
        });

        // Send verification email
        sendEmailVerification(user)
          .then(() => {
            toast.success("Verification email sent!", {
              position: "top-right" as ToastPosition,
            });
            console.log("Verification email sent.");
          })
          .catch((error) => {
            toast.error(`Error sending verification email: ${error.message}`, {
              position: "top-right" as ToastPosition,
            });
            console.error("Error sending verification email:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error signing up: ${errorMessage}`, {
          position: "top-right" as ToastPosition,
        });
        console.error("Error signing up:", errorCode, errorMessage);
      });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    checkPasswordCriteria(newPassword);
  };

  const SignIn = "/SignIn";

  return (
    <div className="flex flex-col py-20 w-auto min-h-screen">
      <Header />
      <div className="grid grid-cols-2 gap-8 p-8 m-7  items-center overflow-hidden">
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
                onChange={handlePasswordChange}
                value={password}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="text-sm mt-2">
              <p
                className={
                  passwordCriteria.hasUppercase
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {passwordCriteria.hasUppercase ? "✓" : "✗"} Contains an
                uppercase letter
              </p>
              <p
                className={
                  passwordCriteria.hasNumber ? "text-green-600" : "text-red-600"
                }
              >
                {passwordCriteria.hasNumber ? "✓" : "✗"} Contains a number
              </p>
              <p
                className={
                  passwordCriteria.hasSpecialChar
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {passwordCriteria.hasSpecialChar ? "✓" : "✗"} Contains a special
                character
              </p>
            </div>
            <button
              type="submit"
              className="w-auto py-2 px-4 bg-violet-900 text-white font-semibold rounded-md hover:bg-violet-500"
            >
              Sign Up
            </button>
          </form>
          <div>
            <p className="mt-4">
              Already have an account?{" "}
              <Link className=" text-violet-900" to={SignIn}>
                {" "}
                Sign In here
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

export default SignUp;
