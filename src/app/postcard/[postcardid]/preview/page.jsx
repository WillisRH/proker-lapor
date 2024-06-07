'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { isVerified } from '@/helper/isVerified';

export default function PostcardPreviewPage() {
  const router = useRouter();
  const { postcardid } = useParams();
  const [postcard, setPostcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('bg-purple-900');

  useEffect(() => {
    const checkVerified = async () => {
      try {
        const verified = await isVerified();
        if (!verified) {
          router.push('/faq');
          return;
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkVerified();

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/postcard/id?id=${postcardid}`);
        const postcardData = response.data.postcard;
        setPostcard(postcardData);
      } catch (error) {
        console.error('Error fetching postcard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postcardid) {
      fetchData();
    }
  }, [postcardid]);

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="og:title" content="Postcard Preview" />
        <meta name="og:description" content="Preview of the postcard" />
        <meta name="og:image" content="https://cdn.discordapp.com/attachments/785664503802232872/1055428572296257667/1671704165791.jpg" />
        <title>{postcard ? postcard.title : 'No Postcard'}</title>
        <link rel="icon" type="image/x-icon" href="https://cdn.discordapp.com/attachments/785664503802232872/1055428572296257667/1671704165791.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:wght@600;700|Poppins&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
      </head>
      <body className={`min-h-screen ${backgroundColor} text-white flex flex-col items-center justify-center`}>
        <div className='text-right absolute top-10 left-10'>
          <button
            className="backbtn bg-transparent text-white flex items-center gap-2 mb-4 p-2 text-xl"
            onClick={() => router.push('/')}
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <h3>Back</h3>
          </button>
        </div>
        <div className="absolute right-10 top-16">
          <select
            id="background-color"
            className="text-black p-2 rounded"
            onChange={handleBackgroundColorChange}
          >
            <option value="bg-purple-900">Purple - Black</option>
            <option value="bg-gradient-to-br from-red-500 to-blue-500">Red - Blue</option>
            <option value="bg-gradient-to-br from-green-500 to-aqua-500">Green - Aqua</option>
            <option value="bg-gradient-to-br from-black to-white">Black - White</option>
            <option value="bg-gradient-to-br from-blue-600 to-peach-400">Royal Blue - Peach</option>
            <option value="bg-gradient-to-br from-blue-700 to-pink-300">Blue - Pink</option>
            <option value="bg-gradient-to-br from-green-400 to-blue-600">Lime Green - Electric Blue</option>
            <option value="bg-gradient-to-br from-pink-600 to-cyan-400">Hot Pink - Cyan</option>
            <option value="bg-gradient-to-br from-sky-400 to-peachpuff">Sky Blue - Peach Puff</option>
          </select>
        </div>
        <div className="container text-center">
          {postcard ? (
            <>
              {postcard.title.length >= 12 ? (
                <h3 className="title text-2xl font-bold mb-4">{postcard.title}</h3>
              ) : (
                <h1 className="title text-4xl font-bold mb-4">{postcard.title}</h1>
              )}
              <div className="question bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text text-lg">{postcard.description}</h2>
              </div>
            </>
          ) : (
            <h1>This postcard isn't available anymore.</h1>
          )}
        </div>
      </body>
    </div>
  );
}
