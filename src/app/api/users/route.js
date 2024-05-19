import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";

connectMongoDB();


export async function GET(req, res) {
    try {
      const users = await User.find({});
      return new Response(JSON.stringify({ users }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
    }
  }



export async function PUT(request) {
  try {
    const reqBody = await request.json();
    const { id, isVerified, isAdmin } = reqBody;

    const user = await User.findById(id);

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    if (isVerified !== undefined) {
      user.isVerified = isVerified;
    }
    if (isAdmin !== undefined) {
      user.isAdmin = isAdmin;
    }

    await user.save();

    return new Response(
      JSON.stringify({
        message: 'User updated successfully',
        success: true,
        user,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
