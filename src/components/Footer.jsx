import React from "react";
import logo from "../assets/logo.png";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className=" bg-gray-950 ">
        <div className="bg-gray-950 text-[#8794BA]  px-4 md:px-8 lg:px-20">
          <div className="py-5 flex md:flex-row flex-col items-center justify-center md:items-center md:justify-between gap-6">
            <Link to={"/"} className="cursor-pointer">
              <img
                className="h-[50px] w-[128px]"
                src={logo}
                alt="marvel logo"
              />
            </Link>
            <div className="text-center">
              Marvel's vast library of characters, comics, events & stories
            </div>
            <div className="flex items-center justify-center gap-5  text-[#8794BA] text-[24px] ">
              <Link className="hover:text-red-500 cursor-pointer" to={`/`}>
                <BiLogoTwitter />
              </Link>
              <Link className="hover:text-red-500 cursor-pointer" to={`/`}>
                <BiLogoGithub />
              </Link>
              <Link className="hover:text-red-500 cursor-pointer" to={`/`}>
                <BiLogoLinkedin />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-t-[#2A407C text-[#8794BA] text-[24px] px-4 md:px-8 lg:px-20">
          <div className="text-center text-[10px]">
            © 2022 Marvelverse. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
