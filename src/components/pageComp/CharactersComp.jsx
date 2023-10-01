import React from "react";
import ScrollPositionManager from "../ScrollManager";
import { Link } from "react-router-dom";
import { BiSolidInfoCircle } from "react-icons/bi";

const CharactersComp = ({ search, searchTerm, characters }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 pt-4">
        {characters?.map((c, index) => (
          <div key={index}>
            <ScrollPositionManager
              scrollKey={`${
                c.id + c.description + `${search ? searchTerm : null} `
              }`}
            />
            <div className="transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2">
              <Link
                key={c.id}
                to={`/characters/${c.id}/${c.name.replace(/\//g, "-")}`}
                className="py-4"
              >
                <div className={` relative `}>
                  <>
                    <img
                      src={c.thumbnail.path + ".jpg"}
                      className={`${"rounded-xl"}`}
                      alt={"img of " + c.name}
                    />
                  </>

                  <div
                    className={`text-xl font-bold p-2 font-mono absolute bottom-2 right-0 ${
                      c.description ? "text-green-500" : "text-red-500"
                    }  rounded-br-xl rounded-tl-md`}
                  >
                    <BiSolidInfoCircle />
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <div className={`uppercase  font-bold py-2  "`}>{c.name}</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharactersComp;
