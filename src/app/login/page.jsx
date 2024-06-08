"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Login");
  const [buttonClass, setButtonClass] = useState(
    "mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50"
  );
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      setButtonText("Logging in...");
      setButtonClass(
        "mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50"
      );
      const response = await axios.post("/api/users/login", user);
      if (response.status === 200) {
        toast.success(`Logged in as ${response.data.username}`, {
          position: "top-right",
        });
        router.push("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setButtonText("Wrong Credentials");
        toast.error('Wrong Credentials!', {
          position: "top-right",
        });
        setButtonClass(
          "mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 disabled:opacity-50"
        );
      } else {
        console.log("Login failed", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = () => {
    if (buttonText === "Wrong Credentials") {
      setButtonText("Login");
      setButtonClass(
        "mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Login
        </h1>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onFocus={handleFocus}
          className="appearance-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 text-black"
          placeholder="Enter your email"
        />
        <label htmlFor="password" className="block mt-4 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onFocus={handleFocus}
          className="appearance-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 text-black"
          placeholder="Enter your password"
        />

        <button
          onClick={onLogin}
          disabled={loading}
          className={buttonClass}
        >
          {loading ? "Logging in..." : buttonText}
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
