import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectMongoDB();

async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User does not exist" }), { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return new NextResponse(JSON.stringify({ error: "Invalid password" }), { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

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
