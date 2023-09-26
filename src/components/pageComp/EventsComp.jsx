import React from "react";

const EventsComp = (props) => {
  const events = props?.events;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
        {events?.map((c) => (
          <div
            key={c.id}
            // onMouseEnter={() => handleMouseEnter(c.id)}
            // onMouseLeave={handleMouseLeave}
            className={` 
                
                transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2`}
          >
            <ScrollPositionManager
              scrollKey={`${c.id + c.title + searchTerm}`}
            />

            <Link key={c.id} to={`/events/${c.id}/${c.title}`}>
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
    </div>
  );
};

export default EventsComp;
