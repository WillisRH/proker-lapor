import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* <Image fill={true} src="images/logodubes.png" alt="Logo"/> */}
      <div className="font-bold text-xl">
        <Link href="/">
          LAPOR 
        </Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link href="/new">
            Add Performance
          </Link>
        </li>
        {/* <li>
          <Link href="/about">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact">
            Contact
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
