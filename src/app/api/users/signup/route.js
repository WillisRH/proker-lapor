import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connectMongoDB();

async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    const user = await User.findOne({ username });

    if (user) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email: `${username}@lapor.sman12`,
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
