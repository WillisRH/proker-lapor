import connectMongoDB from "@/lib/mongodb";
import Postcard from "@/models/postcard";
import { NextResponse } from "next/server";

export async function GET(request) {
    let response;
    const start = Date.now();
    let id;
    try {
      await connectMongoDB();
      const idStartIndex = request.url.indexOf('=') + 1;
      id = request.url.slice(idStartIndex);
      if (!id) {
        throw new Error('ID is missing');
      }
      const postcard = await Postcard.findById(id);
      if (!postcard) {
        response = NextResponse.json({ error: 'Postcard not found' }, { status: 404 });
      } else {
        response = NextResponse.json({ postcard }, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching postcard by ID:', error);
      response = NextResponse.json({ error: 'Failed to fetch postcard by ID' }, { status: 400 });
    } finally {
      const end = Date.now();
      const duration = end - start;
      console.log(`GET /api/postcard?id=${id || ''} ${response.status} in ${duration}ms`);
      return response || NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
  

  export async function DELETE(request) {
    let response;
    const start = Date.now();
    let id;
    try {
      await connectMongoDB();
      const idStartIndex = request.url.indexOf('=') + 1;
      id = request.url.slice(idStartIndex);
      if (!id) {
        throw new Error('ID is missing');
      }
      const deletedPostcard = await Postcard.findByIdAndDelete(id);
      if (!deletedPostcard) {
        response = NextResponse.json({ error: 'Postcard not found' }, { status: 404 });
      } else {
        response = NextResponse.json({ message: 'Postcard deleted successfully' }, { status: 200 });
      }
    } catch (error) {
      console.error('Error deleting postcard by ID:', error);
      response = NextResponse.json({ error: 'Failed to delete postcard by ID' }, { status: 400 });
    } finally {
      const end = Date.now();
      const duration = end - start;
      console.log(`DELETE /api/postcard?id=${id || ''} ${response.status} in ${duration}ms`);
      return response || NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }