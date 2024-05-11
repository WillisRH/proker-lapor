"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import NewPostcardForm from "@/components/newPostcardForm";

const restrictAccess = (router) => {
  // Get the current date
  const currentDate = new Date();
  
  // Extract the day of the month
  const dayOfMonth = currentDate.getDate();
  
  // Check if it's the 11th day of the month
  if (dayOfMonth !== 11) {
    // If it's not the 11th day, redirect to a page indicating access is denied
    router.push('/');       
  }
};

export default function New() {
  const router = useRouter();

  useEffect(() => {
    restrictAccess(router);
  }, []); // Run only once on component mount

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <NewPostcardForm />
      </div>
    </div>
  );
}
