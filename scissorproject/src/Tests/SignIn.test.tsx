// src/components/SignIn.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // for extended matchers
import SignIn from "../pages/Signin/SignIn";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import fetchMock from "jest-fetch-mock";

// Mock Firebase auth function
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock React Router useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Set up mock for fetch and clipboard
fetchMock.enableMocks();
Object.defineProperty(window, "navigator", {
  value: { clipboard: { writeText: jest.fn() } },
  configurable: true,
});

// Wrapper to include Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<Router>{ui}</Router>);
};

describe("SignIn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  test("renders the component", () => {
    renderWithRouter(<SignIn />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  test("shows error message when email is invalid", async () => {
    renderWithRouter(<SignIn />);

    fireEvent.input(screen.getByLabelText(/Email Address:/i), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(screen.getByText("Invalid Email Address.")).toBeInTheDocument();
    });
  });

  test("shows error message when password is missing", async () => {
    renderWithRouter(<SignIn />);

    fireEvent.input(screen.getByLabelText(/Email Address:/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });
  });

  test("handles successful sign in", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { email: "test@example.com" },
    });

    renderWithRouter(<SignIn />);

    fireEvent.input(screen.getByLabelText(/Email Address:/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.input(screen.getByLabelText(/Password:/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/MyURLs");
    });
  });

  test("handles sign in error", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: "auth/wrong-password",
      message: "The password is incorrect.",
    });

    renderWithRouter(<SignIn />);

    fireEvent.input(screen.getByLabelText(/Email Address:/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.input(screen.getByLabelText(/Password:/i), {
      target: { value: "wrong-password" },
    });

    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Error signin you in: The password is incorrect.",
        { position: "top-right" }
      );
    });
  });

  test("redirects to signup page", () => {
    renderWithRouter(<SignIn />);

    fireEvent.click(screen.getByText(/Sign Up here/i));
    expect(screen.getByText(/Sign Up here/i)).toBeInTheDocument();
  });
});
