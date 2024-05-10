import connectMongoDB from '@/lib/mongodb';
import Postcard from '@/models/postcard';
import { NextResponse } from 'next/server';

export async function POST(request) {
  let response;
  try {
    const { title, description } = await request.json();
    await connectMongoDB();

    const newPostcard = new Postcard({ title, description });
    await newPostcard.save();

    response = NextResponse.json({ message: 'Postcard saved' }, { status: 201 });
  } catch (error) {
    console.error('Error saving postcard:', error);
    response = NextResponse.json({ error: 'Failed to save postcard' }, { status: 500 });
  } finally {
    return response || NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

export async function GET(req, params) {
  let response;
  try {
    await connectMongoDB();
    

    // Check if the request has a postcard ID parameter
    if (params.id) {
      // Fetch the specific postcard by its ID
      const postcard = await Postcard.findById(params.id);

      if (!postcard) {
        response = NextResponse.json({ error: 'Postcard not found' }, { status: 404 });
      } else {
        response = NextResponse.json({ postcard }, { status: 200 });
      }
    } else {
      // Fetch all postcards if no specific ID is provided
      const postcards = await Postcard.find({});

      if (!postcards || postcards.length === 0) {
        response = NextResponse.json({ error: 'No postcards found' }, { status: 404 });
      } else {
        response = NextResponse.json({ postcards }, { status: 200 });
      }
    }
  } catch (error) {
    console.error('Error fetching postcards:', error);
    response = NextResponse.json({ error: 'Failed to fetch postcards' }, { status: 500 });
  } finally {
    return response || NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
