import React from "react";
import ScrollPositionManager from "../ScrollManager";
import { Link } from "react-router-dom";
import moment from "moment";

const EventsComp = ({ events, searchTerm }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
        {events?.map((c, index) => (
          <div
            key={index}
            className={` 
                
                transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2`}
          >
            <ScrollPositionManager
              scrollKey={`${c.id + c.title + searchTerm}`}
            />

            <Link
              key={c.id}
              to={`/events/${c.id}/${c.title.replace(/\//g, "-")}`}
            >
              <div className={`  `}>
                <>
                  <img
                    src={c.thumbnail.path + ".jpg"}
                    className={`${"rounded-xl "}  `}
                    alt={"img of " + c.title}
                  />
                </>
              </div>
              <div className="px-2 pb-2">
                <div className="font-mono font-bold text-[#a7a4a4] py-2">
                  {c.start ? moment(c.start).format("YYYY") : "Nill"}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventsComp;
