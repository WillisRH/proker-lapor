"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import NewPostcardForm from "@/components/newPostcardForm";
import restrictAccess from '@/helper/restrictAccess';
import { isVerified } from '@/helper/isVerified';



export default function New() {
  const router = useRouter();

  useEffect(() => {
    const checkVerified = async() => {
      try {
        const verified = await isVerified();
        if (!verified) {
          router.push('/faq');
          return;
        }
      } catch (err) {
        console.error(err)
      }
    }
    checkVerified();
    restrictAccess;
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
