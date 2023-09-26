import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { collection } from "../data";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  // Add this effect to handle body overflow
  useEffect(() => {
    if (nav) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Make sure to reset when unmounting
    };
  }, [nav]);

  return (
    <div className="bg-black fixed h-auto w-full left-0 top-0 z-30">
      {/* for tabs and pcs */}
      <div className="md:flex md:flex-col hidden ">
        <div className="border border-gray-600 flex items-center justify-between px-20 text-white relative">
          <Link
            className="uppercase border hover:text-red-500 border-r-gray-600 border-l-gray-600 font-semibold border-t-0 border-b-0 p-3 flex items-center justify-center cursor-pointer"
            to={`/join`}
          >
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

        {nav && (
          <div className="absolute w-full  backdrop-blur-3xl  transform overflow-y-scroll">
            <div className="min-h-screen border-r-white/20 bg-black py-6 border-r-[1px] ">
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
                    <Link
                      to={`/collection`}
                      onClick={handleClick}
                      className="text-red-500"
                    >
                      Collection
                    </Link>
                  </li>
                  <li className="w-full pl-3">
                    <div className="grid grid-cols-2 justify-between gap-5 text-sm">
                      {collection?.map((item, index) => (
                        <div key={index}>
                          <Link
                            to={item?.name && `/collection/${item.name}`}
                            className="cursor-pointer text-white capitalize hover:text-red-500"
                            onClick={handleClick}
                          >
                            {item?.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
