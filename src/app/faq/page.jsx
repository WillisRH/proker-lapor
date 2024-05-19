"use client"
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import ImportantButton from '@/components/importantbutton';

export default function FAQ() {
  return (
    <div>
        <ImportantButton />
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center text-black">
        <div className="max-w-xl p-8 bg-white shadow-lg rounded-md">
          <h1 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg mb-4">
            <span className="font-semibold">Q:</span> Why can't I see the postcards?
            <br />
            <span className="font-semibold">A:</span> You cannot see the postcards because you have not been verified.
            Please ensure that you have completed the verification process to access this feature.
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Q:</span> How can I verify my account?
            <br />
            <span className="font-semibold">A:</span> To verify your account, please follow the instructions provided in your email or contact our support team for assistance.
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Q:</span> Can I access other features while not verified?
            <br />
            <span className="font-semibold">A:</span> Some features may be restricted until you complete the verification process. However, you can still access basic functionalities such as browsing the FAQ section.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
