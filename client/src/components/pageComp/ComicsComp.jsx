import React from "react";
import ScrollPositionManager from "../ScrollManager";
import { Link } from "react-router-dom";
// import { BiSolidInfoCircle } from "react-icons/bi";

const ComicsComp = ({ comics, search, searchTerm }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 pt-4">
        {comics?.map((c, index) => (
          <div
            className="transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2"
            key={index}
          >
            <ScrollPositionManager
              scrollKey={`${
                c.id + c.diamondCode + `${search ? searchTerm : null}`
              }`}
            />
            <Link
              key={c.id}
              // fixing the user authentication
              // to={
              //   c.prices[0].price <= 0
              //     ? `/comics/${c.id}/${c.title.replace(/\//g, "-")}`
              //     : `/signin`
              // }
              to={`/comics/${c.id}/${c.title.replace(/\//g, "-")}`}
              className="py-4"
            >
              <div className={` relative`}>
                <>
                  <img
                    src={c.thumbnail.path + ".jpg"}
                    className={`${"rounded-xl w-full"}`}
                    alt={"img of " + c.title}
                  />
                </>
                <div className="absolute top-0 left-0 font-semibold">
                  {c.prices[0].price <= 0 ? (
                    <div className="bg-green-500 px-3 rounded-tl-xl">FREE</div>
                  ) : (
                    <div className="bg-red-500 px-3 py-1 rounded-tl-xl">
                      PREMIUM
                    </div>
                  )}
                </div>
              </div>
              <div className="px-2 pb-2 flex items-center justify-between">
                <div
                  className={`uppercase  font-bold py-2 font-mono text-[#a7a4a4]"`}
                >
                  {c.title}
                </div>
                {/* {c.prices[0].price <= 0 && (
                  <div
                    className={`text-xl font-bold font-mono ${
                      c.description ? "text-green-500" : "text-red-500"
                    }  rounded-br-xl rounded-tl-md`}
                  >
                    <BiSolidInfoCircle />
                  </div>
                )} */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ComicsComp;
