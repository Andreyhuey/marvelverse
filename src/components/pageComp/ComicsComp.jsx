import React from "react";
import ScrollPositionManager from "../ScrollManager";
import { Link } from "react-router-dom";
import { BiSolidInfoCircle } from "react-icons/bi";
import { seriesOptions } from "../../data";

const ComicsComp = ({ comics, search, searchTerm }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
      {comics?.map((c) => (
        <div key={c.id}>
          <div className="transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2">
            <ScrollPositionManager
              scrollKey={`${
                c.id + c.diamondCode + `${search ? searchTerm : null}`
              }`}
            />
            <Link key={c.id} to={`/comics/${c.id}/${c.title}`} className="py-4">
              <div className={` relative`}>
                <>
                  <img
                    src={c.thumbnail.path + ".jpg"}
                    className={`${"rounded-xl w-full"}`}
                    alt={"img of " + c.title}
                  />
                </>

                <div
                  className={`text-xl font-bold p-2 font-mono absolute bottom-2 left-0 ${
                    c.description ? "text-green-500" : "text-red-500"
                  }  rounded-br-xl rounded-tl-md`}
                >
                  <BiSolidInfoCircle />
                </div>
              </div>
              <div className="px-2 pb-2 flex items-center justify-center">
                <div
                  className={`uppercase  font-bold py-2 font-mono text-[#a7a4a4] text-center"`}
                >
                  {c.title}
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComicsComp;
