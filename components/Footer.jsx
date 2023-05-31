import Image from "next/image";
import logoNt from "../public/images/logoNt.png";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full py-10 bg-bgColor text-white/80 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src={logoNt} width={80} height={80} alt="logo" />
          <p className="flex items-center text-sm font-titleFont gap-1">
            <AiOutlineCopyrightCircle className="mt-[1px]" />
            Tanja Schmidt - {currentYear}
          </p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/Sunkio/sanescribe" target="_blank" rel="noopener noreferrer">
            <BsGithub className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
          <a href="https://www.linkedin.com/in/tanja-schmidt-dev/" target="_blank" rel="noopener noreferrer">
            <BsLinkedin className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
          <a href="https://twitter.com/tanja_codes" target="_blank" rel="noopener noreferrer">
            <BsTwitter className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;