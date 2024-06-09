// pages/index.js
"use client";
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Postcard from '@/components/postcard';
import ImportantButton from '@/components/importantbutton';
import PostcardFinder from '@/components/PostcardFinder'; // Import the PostcardFinder component
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { isVerified } from '@/helper/isVerified';

export default function Home() {
  const [postcards, setPostcards] = useState([]);
  const [filteredPostcards, setFilteredPostcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/postcard', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch postcards');
        }

        const verified = await isVerified();
        if (!verified) {
          router.push('/faq');
          return;
        }
        const data = await response.json();
        setPostcards(data.postcards);
        setFilteredPostcards(data.postcards); // Initialize filtered postcards
        // console.log(data.postcards);
      } catch (error) {
        console.error('Error fetching postcards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredPostcards(postcards); // If search term is empty, show all postcards
    } else {
      const filtered = postcards.filter(postcard =>
        postcard.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        || postcard.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPostcards(filtered);
    }
  };

  return (
    <div>
      <Navbar />
      <ImportantButton />

      <div className="min-h-screen flex flex-col items-center justify-center">
        <Link href={"/about-us"}>
          <div className="mb-8 relative">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-black">
              <h1 className="font-bold text-3xl mb-2">Mading Ekstrakulikuler dan Osis</h1>
              <BsFillPinAngleFill className="absolute top-2 right-2 text-xl text-gray-700" />
            </div>
          </div>
        </Link>

        <PostcardFinder onSearch={handleSearch} /> {/* Add the PostcardFinder component */}

        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
        ) : filteredPostcards.length === 0 ? (
          <div className='text-gray-800 text-2xl'>There is no postcard yet.</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {filteredPostcards.map((post) => (
              <Postcard key={post._id} title={post.title} description={post.description} id={post._id} createdat={post.createdAt} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
