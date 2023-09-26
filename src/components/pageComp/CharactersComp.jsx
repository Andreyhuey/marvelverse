import React from "react";

const CharactersComp = (props) => {
  const characters = props?.characters;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 pt-4">
        {characters?.map((c, index) => (
          <div key={index}>
            <ScrollPositionManager
              scrollKey={`${c.id + c.description + searchTerm}`}
            />
            <div className="transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2">
              <Link
                key={c.id}
                to={`/characters/${c.id}/${c.name}`}
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

                  {c.description ? (
                    <div className="text-xl font-bold p-2 font-mono absolute bottom-2 left-0 text-green-500 rounded-br-xl rounded-tl-md">
                      <BiSolidInfoCircle />
                    </div>
                  ) : (
                    <div className="text-xl font-bold p-2 font-mono absolute bottom-2 left-0 text-red-500 rounded-br-xl rounded-tl-md">
                      <BiSolidInfoCircle />
                    </div>
                  )}
                </div>

                <div className="px-2 pb-2">
                  <div className={`uppercase  font-bold py-2  "`}>{c.name}</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharactersComp;
