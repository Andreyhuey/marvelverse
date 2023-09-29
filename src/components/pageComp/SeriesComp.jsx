import React from "react";

const SeriesComp = (props) => {
  const series = props?.series;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
        {series?.map((c) => (
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

            <Link key={c.id} to={`/series/${c.id}/${c.title}`}>
              <div className={` relative `}>
                <>
                  <img
                    src={c.thumbnail.path + ".jpg"}
                    className={`${"rounded-xl "}  `}
                    alt={"img of " + c.title}
                  />
                </>

                {c.description ? (
                  <div className="text-xl font-bold p-2 font-mono absolute bottom-2 right-0 text-green-500 rounded-br-xl rounded-tl-md">
                    <BiSolidInfoCircle />
                  </div>
                ) : (
                  <div className="text-xl font-bold p-2 font-mono absolute bottom-2 right-0 text-red-500 rounded-br-xl rounded-tl-md">
                    <BiSolidInfoCircle />
                  </div>
                )}
              </div>
              <div className="px-2 pb-2">
                <div className="font-mono font-bold text-[#a7a4a4] py-2">
                  {c.title}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesComp;