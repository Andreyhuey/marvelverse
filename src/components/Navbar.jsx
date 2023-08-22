import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="bg-black fixed h-auto w-full left-0 top-0 z-30">
      {/* for tabs and pcs */}
      <div className="md:flex md:flex-col hidden ">
        <div className="border border-gray-600 flex items-center justify-between px-20 text-white">
          <Link className="uppercase border hover:text-red-500 border-r-gray-600 border-l-gray-600 font-semibold border-t-0 border-b-0 p-3 flex items-center justify-center cursor-pointer">
            sign in | join
          </Link>
          <Link to={`/`} className="cursor-pointer">
            <img src={logo} alt="site logo" className="h-[50px] w-[128px]" />
          </Link>
          <Link
            className="text-[24px] border hover:text-red-500 border-r-gray-600 border-l-gray-600 font-semibold border-t-0 border-b-0 p-3"
            to={`/search`}
          >
            <BiSearchAlt />
          </Link>
        </div>
        <ul className="items-center justify-center flex text-white text-[13px] gap-8 uppercase py-2 font-bold">
          <li className="cursor-pointer hover:text-red-500">
            <Link to={`/characters`}>Characters</Link>
          </li>
          <li className="cursor-pointer hover:text-red-500">
            <Link to={`/comics`}>Comics</Link>
          </li>
          <li className="cursor-pointer hover:text-red-500">
            <Link to={`/events`}>Events</Link>
          </li>
          <li className="cursor-pointer hover:text-red-500">
            <Link to={`/series`}>Series</Link>
          </li>
        </ul>
      </div>
      {/* for phones */}
      <div className="md:hidden flex justify-between text-white">
        <div
          className="flex items-center justify-center p-4"
          onClick={handleClick}
        >
          <HiOutlineMenu className="text-[26px]" />
        </div>
        {nav ? (
          <div className="absolute h-screen w-full p-4 cursor-pointer bg-black transform">
            <div className="flex flex-col gap-6 text-white font-bold">
              <IoCloseCircleOutline
                className="text-[26px] right-0 cursor-pointer"
                onClick={handleClick}
              />

              <ul className="flex flex-col gap-6 text-white font-bold">
                <li className="cursor-pointer hover:text-red-500">
                  <Link to={`/characters`} onClick={handleClick}>
                    Characters
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  <Link to={`/comics`} onClick={handleClick}>
                    Comics
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  <Link to={`/events`} onClick={handleClick}>
                    Events
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  <Link to={`/series`} onClick={handleClick}>
                    Series
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Link to={`/`} className="cursor-pointer">
              <img src={logo} alt="site logo" className="h-[50px] w-[128px]" />
            </Link>
            <Link
              className="text-[26px] hover:text-red-500 font-semibold p-3"
              to={`/search`}
            >
              <BiSearchAlt />
            </Link>
          </>
        )}
      </div>

      {/* {nav && (
        <ul
          className={
            !nav
              ? "hidden"
              : "absolute h-screen w-full px-4 cursor-pointer bg-black"
          }
        >
          <div className="flex flex-col gap-6 text-white pt-8 font-bold">
            <li className="cursor-pointer hover:text-red-500">
              <Link to={`/characters`} onClick={handleClick}>
                Characters
              </Link>
            </li>
            <li className="cursor-pointer hover:text-red-500">
              <Link to={`/comics`} onClick={handleClick}>
                Comics
              </Link>
            </li>
            <li className="cursor-pointer hover:text-red-500">
              <Link to={`/events`} onClick={handleClick}>
                Events
              </Link>
            </li>
            <li className="cursor-pointer hover:text-red-500">
              <Link to={`/series`} onClick={handleClick}>
                Series
              </Link>
            </li>
          </div>
        </ul>
      )} */}
    </div>
  );
};

export default Navbar;
