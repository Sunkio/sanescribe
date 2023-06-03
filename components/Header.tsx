
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { Category } from "../typings";

interface HeaderProps {
  categories: Array<Category>;
  fallback?: boolean;
}

const Header: React.FC<HeaderProps> = ({ categories, fallback }) => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const burgerIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

const closeIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);
  
  const menuItems = (
    <>
      <li className="headerLi">
        <Link href="/">Home</Link>
      </li>
      {!fallback &&
        categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <li key={category._id} className="headerLi">
            <Link href={`/category/${category.slug.current}`}>
              {category.title}
            </Link>
          </li>
        ))}
      <li className="headerLi">About Me</li>
      <li className="headerLi">Contact</li>
    </>
  );

  const signInOutButton = (
    <button
      onClick={() => (session ? signOut() : signIn())}
      className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
    >
      {session ? "Sign Out" : "Sign In"}
    </button>
  );

  const userProfile = (
    <div className="flex items-center gap-1 pl-2">
      <img
        className="w-8 h-8 rounded-full"
        src={
          session
            ? session?.user!.image!
            : "https://i.pravatar.cc/300"
        }
        alt="User profile"
      />
      <p className="text-sm font-medium">
        {session ? session?.user!.name : "Hello Stranger!"}
      </p>
    </div>
  );

  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <Image height={60} src={logo} alt="logo" />
          </div>
        </Link>

        {/* Burger menu */}
        <div className="lg:hidden">
          <button
            className="text-xl text-gray-500 focus:outline-none"
            onClick={handleMenuToggle}
          >
            {menuOpen ? closeIcon : burgerIcon}
          </button>
        </div>

        {/* Regular menu */}
        <div className="hidden lg:flex items-center gap-8 uppercase text-sm font-semibold">
          <ul className="lg:flex gap-8">{menuItems}</ul>
        </div>

        {/* User profile and sign in/out ONLY for large screens*/}
        <div className="hidden lg:flex items-center gap-8 text-lg">
          {userProfile}
          {signInOutButton}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-x-0 inset-y-12 border-b-[1px] border-b-black shadow-md pt-4 w-full transition-transform duration-300">
          <div className="bg-white shadow-md p-4 border-b-[1px] border-b-black">
            <ul className="text-sm font-semibold bg-white text-current gap-5 mt-5 pl-2">{menuItems}</ul>
            {/* User profile and sign in/out ONLY for small screens */}
            <div className="flex items-center gap-4 text-lg mt-5 bg-white">
              {userProfile}
              {signInOutButton}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;