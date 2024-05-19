import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Ensure that the MongoDB connection is established
connectMongoDB();

async function POST(request) {
    try {
        // Check if default admin credentials are defined in environment variables
        const { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, TOKEN_SECRET } = process.env;

        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if the provided credentials match the default admin credentials
        if (DEFAULT_ADMIN_EMAIL && DEFAULT_ADMIN_PASSWORD) {
            if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
                // Create token data for the default admin
                const tokenData = {
                    id: "default-admin-id", // You can use any unique identifier here
                    username: "default-admin",
                    email: DEFAULT_ADMIN_EMAIL
                };

                // Create a token with expiration of 1 day
                const token = await jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: "1d" });

                // Create a JSON response indicating successful login
                const response = new NextResponse(JSON.stringify({
                    message: "Login successful",
                    success: true
                }));

                // Set the token as an HTTP-only cookie
                response.cookies.set("token", token, {
                    httpOnly: true
                });

                return response;
            }
        }

        // Check if user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User does not exist" }), { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return new NextResponse(JSON.stringify({ error: "Invalid password" }), { status: 400 });
        }

        // Create token data for the regular user
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: "1d" });

        // Create a JSON response indicating successful login
        const response = new NextResponse(JSON.stringify({
            message: "Login successful",
            success: true
        }));

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export { POST };
