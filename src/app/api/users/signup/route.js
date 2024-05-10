import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connectMongoDB();

async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        success: true,
        savedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export { POST };
