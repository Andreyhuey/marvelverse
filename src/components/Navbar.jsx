import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="bg-black fixed h-auto w-full left-0 top-0 z-30">
      {/* for tabs and pcs */}
      <div className="md:flex md:flex-col hidden ">
        <div className="border border-gray-600 flex items-center justify-between px-20 text-white relative">
          <Link className="uppercase border hover:text-red-500 border-r-gray-600 border-l-gray-600 font-semibold border-t-0 border-b-0 p-3 flex items-center justify-center cursor-pointer">
            sign in | join
          </Link>
          <Link
            to={`/`}
            className="cursor-pointer absolute top-1/2 left-1/2 
          transform -translate-x-1/2 -translate-y-1/2"
          >
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
          <li className="cursor-pointer hover:text-red-500">
            <Link to={`/series`}>Collection</Link>
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

        {nav ? (
          <div className="absolute h-screen w-full  backdrop-blur-lg  transform">
            <div className="w-[80%] border-r-white/20 bg-white/5 py-4 border-r-[1px] h-screen ">
              <div className="flex flex-col gap-6 text-white font-bold">
                <div className="pl-3">
                  <AiOutlineClose
                    className="text-[26px] cursor-pointer inline text-white"
                    onClick={handleClick}
                  />
                </div>

                <ul className="flex flex-col gap-5 text-white font-bold pt-8 ">
                  <li className="cursor-pointer hover:text-red-500 border-b-[1px] border-white/20 pb-4 pl-3">
                    <Link to={`/`} onClick={handleClick}>
                      Home
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-red-500 border-b-[1px] border-white/20 pb-4 pl-3">
                    <Link to={`/characters`} onClick={handleClick}>
                      Characters
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-red-500 border-b-[1px] border-white/20 pb-4 pl-3">
                    <Link to={`/comics`} onClick={handleClick}>
                      Comics
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-red-500 border-b-[1px] border-white/20 pb-4 pl-3">
                    <Link to={`/events`} onClick={handleClick}>
                      Events
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-red-500 border-b-[1px] border-white/20 pb-4 pl-3">
                    <Link to={`/series`} onClick={handleClick}>
                      Series
                    </Link>
                  </li>
                  <li className="cursor-pointer pl-3 pb-3">
                    <Link to={`/collection`} onClick={handleClick}>
                      Collection
                    </Link>
                  </li>
                  <li className="w-full pl-3">
                    <div className="grid grid-cols-2 justify-between gap-5 text-sm">
                      <Link
                        to={`/avengers`}
                        className="cursor-pointer text-red-700"
                        onClick={handleClick}
                      >
                        Avengers
                      </Link>
                      <Link
                        to={`/captain-america`}
                        className="cursor-pointer text-blue-700"
                        onClick={handleClick}
                      >
                        Captains
                      </Link>
                      <Link
                        to={`/captain-america`}
                        className="cursor-pointer text-white"
                        onClick={handleClick}
                      >
                        Deadpool
                      </Link>
                      <Link
                        to={`/avengers`}
                        className="cursor-pointer text-green-900"
                        onClick={handleClick}
                      >
                        Hulk
                      </Link>
                      <Link
                        to={`/avengers`}
                        className="cursor-pointer text-red-700"
                        onClick={handleClick}
                      >
                        Spider
                      </Link>
                      <Link
                        to={`/thor`}
                        className="cursor-pointer text-yellow-700"
                        onClick={handleClick}
                      >
                        Thanos
                      </Link>
                      <Link
                        to={`/thor`}
                        className="cursor-pointer text-yellow-700"
                        onClick={handleClick}
                      >
                        Thor
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <></>
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
