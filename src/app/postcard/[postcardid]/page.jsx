"use client"
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'
import axios from 'axios';

export default function PostcardDetailPage() {
  const router = useRouter();
  const postcardid = useParams().postcardid;
  const [postcard, setPostcard] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(postcardid)

  useEffect(() => {
    const fetchPostcard = async () => {
      try {
        const response = await axios.get(`/api/postcard?id=${postcardid}`);
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Postcard Detail</h1>
      {postcard ? (
        <>
          <h2>Title: {postcard.title}</h2>
          <p>Description: {postcard.description}</p>
        </>
      ) : (
        <p>No postcard found.</p>
      )}
    </div>
  );
}
