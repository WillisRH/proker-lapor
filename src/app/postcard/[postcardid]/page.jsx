"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'
import axios from 'axios';
import Navbar from '@/components/navbar';

export default function PostcardDetailPage() {
  const router = useRouter();
  const postcardid = useParams().postcardid;
  const [postcard, setPostcard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostcard = async () => {
      try {
        const response = await axios.get(`/api/postcard/id?id=${postcardid}`);
        setPostcard(response.data.postcard);
      } catch (error) {
        console.error('Error fetching postcard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postcardid) {
      fetchPostcard();
    }
  }, [postcardid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Postcard Detail</h1>
      {postcard ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">{postcard.title}</h2>
          <p className="text-gray-800">{postcard.description}</p>
        </div>
      ) : (
        <p className="text-xl font-semibold text-center text-gray-800 mt-8">No postcard found.</p>
      )}
    </div>
    </div>
  );
}
