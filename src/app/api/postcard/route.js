import connectMongoDB from '@/lib/mongodb';
import Postcard from '@/models/postcard';
import { NextResponse } from 'next/server';

export async function POST(request) {
  let response;
  try {
    const { title, description, owner, privatemsg, performance } = await request.json();
    await connectMongoDB();

    const newPostcard = new Postcard({ title, description, owner, privatemsg, performance });
    await newPostcard.save();

    response = NextResponse.json({ message: 'Postcard saved' }, { status: 201 });
  } catch (error) {
    console.error('Error saving postcard:', error);
    response = NextResponse.json({ error: 'Failed to save postcard' }, { status: 500 });
  } finally {
    return response || NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

export async function GET(request) {
  let response;
  const start = Date.now();
  try {
    await connectMongoDB();
    const postcards = await Postcard.find({});
    if (!postcards || postcards.length === 0) {
      response = NextResponse.json({ error: 'No postcards found' }, { status: 404 });
    } else {
      response = NextResponse.json({ postcards }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching postcards:', error);
    response = NextResponse.json({ error: 'Failed to fetch postcards' }, { status: 500 });
  } finally {
    const end = Date.now();
    const duration = end - start;
    console.log(`GET /api/postcard ${response.status} in ${duration}ms`);
    return response || NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
