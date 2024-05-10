import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
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
