"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/navbar";

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setUserData(res.data.data);
        } catch (error) {
            console.error("Failed to get user details:", error.message);
        }
    };

    return (
        <div>
            <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Profile</h1>
            {userData ? (
                <div className="bg-gray-200 p-4 rounded-lg shadow-md text-black">
                    <p className="text-lg">Email: {userData.email}</p>
                    <p className="text-lg">Username: {userData.username}</p>
                    <p className="text-lg">Admin: {userData.isAdmin ? "Yes" : "No"}</p>
                    <p className="text-lg">Verified: {userData.isVerified ? "Yes" : "No"}</p>
                </div>
            ) : (
                <p className="text-lg">No user data available</p>
            )}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" onClick={getUserDetails}>Get Details</button>
        </div>
        </div>
    );
}
