import connectMongoDB from '@/lib/mongodb';
import Postcard from '@/models/postcard';
import { NextResponse } from 'next/server';

export async function POST(request) {
  let response;
  try {
    const { title, description, owner, privatemsg, performance, referto } = await request.json();
    await connectMongoDB();

    console.log('Request body:', { title, description, owner, privatemsg, performance, referto });

    const newPostcard = new Postcard({ title, description, owner, privatemsg, performance, referto });
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

    const url = new URL(request.url);
    const postcardId = url.searchParams.get('id');
    const userId = url.searchParams.get('userId');

    let postcards;
    if (postcardId) {
      // Fetch the specific postcard by ID and include those referring to it
      const mainPostcard = await Postcard.findById(postcardId).exec();
      const refertoPostcards = await Postcard.find({ referto: postcardId }).exec();
      postcards = { mainPostcard, refertoPostcards };
    } else if (userId) {
      // Fetch all postcards owned by the user, excluding those with referto set to null
      postcards = await Postcard.find({ owner: userId, referto: null }).exec();
    } else {
      // Fetch all postcards excluding those with referto set to null
      postcards = await Postcard.find({ referto: null }).exec();
    }

    if (!postcards || (Array.isArray(postcards) && postcards.length === 0) || (!Array.isArray(postcards) && !postcards.mainPostcard)) {
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
    console.log(`GET /api/postcard ${response?.status} in ${duration}ms`);
    return response || NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
