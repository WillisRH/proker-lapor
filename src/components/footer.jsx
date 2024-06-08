import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto"> {/* Optional container */}
        <p>Follow my GitHub: <a href='https://github.com/willisrh' className='underline'>https://github.com/willisrh</a></p>
      </div>
    </footer>
  );
}

export default Footer;
