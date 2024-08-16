// src/components/ShortenInHome.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // for extended matchers
import ShortenInHome from "../components/ShortenInHome"; // Adjust the path as needed
import { BrowserRouter as Router } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

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

describe("ShortenInHome Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("renders the component", () => {
    renderWithRouter(<ShortenInHome />);
    expect(screen.getByText("Try our URL Shortener out")).toBeInTheDocument();
  });

  test("displays an error message when an invalid URL is submitted", async () => {
    renderWithRouter(<ShortenInHome />);

    fireEvent.input(screen.getByLabelText(/Paste your long link here:/i), {
      target: { value: "invalid-url" },
    });

    fireEvent.click(screen.getByText(/Shorten URL/i));

    await waitFor(() => {
      expect(screen.getByText("Invalid URL format.")).toBeInTheDocument();
    });
  });

  test("handles successful URL shortening", async () => {
    fetchMock.mockResponseOnce("https://tinyurl.com/shortUrl");

    renderWithRouter(<ShortenInHome />);

    fireEvent.input(screen.getByLabelText(/Paste your long link here:/i), {
      target: { value: "https://example.com" },
    });

    fireEvent.click(screen.getByText(/Shorten URL/i));

    await waitFor(() => {
      expect(screen.getByText("Shortened URL:")).toBeInTheDocument();
      expect(
        screen.getByText("https://tinyurl.com/shortUrl")
      ).toBeInTheDocument();
    });
  });

  test("shows an error message if the URL shortening fails", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to shorten URL"));

    renderWithRouter(<ShortenInHome />);

    fireEvent.input(screen.getByLabelText(/Paste your long link here:/i), {
      target: { value: "https://example.com" },
    });

    fireEvent.click(screen.getByText(/Shorten URL/i));

    await waitFor(() => {
      expect(
        screen.getByText("Failed to shorten URL. Please try again.")
      ).toBeInTheDocument();
    });
  });

  test("copied URL to clipboard when copy button is clicked", async () => {
    fetchMock.mockResponseOnce("https://tinyurl.com/shortUrl");

    renderWithRouter(<ShortenInHome />);

    fireEvent.input(screen.getByLabelText(/Paste your long link here:/i), {
      target: { value: "https://example.com" },
    });

    fireEvent.click(screen.getByText(/Shorten URL/i));

    await waitFor(() => {
      fireEvent.click(screen.getByText("Copy"));
      expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
        "https://tinyurl.com/shortUrl"
      );
    });
  });

  test("redirects to signup page when limit is reached", async () => {
    localStorage.setItem("shortenedCount", "3");
    renderWithRouter(<ShortenInHome />);

    fireEvent.input(screen.getByLabelText(/Paste your long link here:/i), {
      target: { value: "https://example.com" },
    });

    fireEvent.click(screen.getByText(/Shorten URL/i));

    await waitFor(() => {
      expect(screen.getByText("Click here to Sign Up")).toBeInTheDocument();
    });
  });
});
