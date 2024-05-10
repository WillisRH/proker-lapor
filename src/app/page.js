"use client";
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import NewPostcardForm from '@/components/newPostcardForm';
import Postcard from '@/components/postcard';
import { useState, useEffect } from 'react'; 
import axios from 'axios'; // Import axios for making HTTP requests
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Home() {
  const [postcards, setPostcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch('/api/postcard', {
          method: 'GET'
        }); // Fetch from your API route
        if (!response.ok) { 
          throw new Error('Failed to fetch postcards'); 
        } 

        const data = await response.json();
        setPostcards(data.postcards); // Assuming the API returns { postcards: [...] }
        console.log(data.postcards)
      } catch (error) {
        console.error('Error fetching postcards:', error);  
        // Handle the error (e.g., display an error message)
      } finally {
        setIsLoading(false); // Set loading state back to false
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div> {/* Optional container */}
      <Navbar /> {/* Navbar at the top */}
      
      {/* Logout button at the bottom left */}
      <button onClick={logout} className="fixed bottom-0 left-0 m-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center"> 
        {/* Center the postcards container */}

        {/* <NewPostcardForm />  */}

        <div className="mb-8"> {/* Added margin bottom */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-black">
            <h1 className="font-bold text-2xl mb-2">Mading Ekstrakulikuler dan Osis</h1>
          </div>
        </div>

        {isLoading ? (
          <div>Loading...</div> // Show a loading indicator
        ) : (
          <div className="flex flex-wrap justify-center gap-4"> 
            {postcards.map((post) => (
              <Postcard key={post._id} title={post.title} description={post.description} id={post._id} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
