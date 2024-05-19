import { getDataFromToken } from "@/helper/getDataFromToken";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

// Ensure that the MongoDB connection is established
connectMongoDB();

export async function GET(request) {
    try {
        // Extract token data from the authentication token
        const tokenData = getDataFromToken(request);

        console.log("Token Data:", tokenData); // Debug log

        const { DEFAULT_ADMIN_EMAIL } = process.env;

        // Check if the request is using the default admin credentials
        if (tokenData.email === DEFAULT_ADMIN_EMAIL) {
            // Send default admin data
            const adminData = {
                _id: tokenData._id,
                username: "default-admin",
                email: DEFAULT_ADMIN_EMAIL,
                isVerified: true,
                isAdmin: true
            };

            return NextResponse.json({
                message: "Default admin found",
                data: adminData
            });
        }

        // Find the user in the database based on the user ID
        const user = await User.findOne({ _id: tokenData.id }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error) {
        console.error("Error:", error.message); // Debug log
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
