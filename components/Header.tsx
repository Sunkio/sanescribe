import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.png";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const {data:session} = useSession();

  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <Image  height={80} src={logo} alt="logo" />
          </div>
        </Link>
        <div>
          <ul className=" lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <li className="headerLi">Home</li>
            <li className="headerLi">Posts</li>
            <li className="headerLi">Pages</li>
            <li className="headerLi">Features</li>
            <li className="headerLi">Contact</li>
          </ul>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            <img
              className="w-8 h-8 rounded-full"
              src={
                session ? session?.user!.image! : "https://i.pravatar.cc/300"
              }
              alt="logo"
            />
            <p className="text-sm font-medium">
              {session ? session?.user!.name : "Hello Stranger!"}
            </p>
          </div>
          {session ? (
              <button onClick={() => signOut()} className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600">
                Sign Out
              </button>
            ) : (
              <button onClick={() => signIn()} className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600">
                Sign In
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
