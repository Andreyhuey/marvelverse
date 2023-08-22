import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiSearchAlt } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="bg-black fixed h-auto w-full left-0 top-0 z-30 ">
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
    </div>
  );
};

export default Navbar;
