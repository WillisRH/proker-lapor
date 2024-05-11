import connectMongoDB from "@/lib/mongodb";
import Postcard from "@/models/postcard";
import { NextResponse } from "next/server";

export async function PUT(request) {
  let response;
  const start = Date.now();
  let id, newData;
  try {
    await connectMongoDB();
    // console.log(await request.json())
    const data = await request.json();
    const postId = data.postId;
    const title = data.title;
    const description = data.description;

    console.log(data)
    
    if (!postId) {
      throw new Error('Post ID is missing');
    }
    
    if (!title && !description) {
      throw new Error('Title or description is required');
    }
    
    newData = {};
    if (title && title != '' && title != null) newData.title = title;
    if (description) newData.description = description;
    
    const updatedPostcard = await Postcard.findByIdAndUpdate(postId, newData, { new: true });
    
    if (!updatedPostcard) {
      response = NextResponse.json({ error: 'Postcard not found' }, { status: 404 });
    } else {
      response = NextResponse.json({ postcard: updatedPostcard }, { status: 200 });
    }
  } catch (error) {
    console.error('Error editing postcard:', error);
    response = NextResponse.json({ error: 'Failed to edit postcard' }, { status: 400 });
  } finally {
    const end = Date.now();
    const duration = end - start;
    console.log(`POST /api/postcard ${response.status} in ${duration}ms`);
    return response || NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
