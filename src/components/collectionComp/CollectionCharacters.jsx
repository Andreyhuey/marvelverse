import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import { useGetCollectionCharactersQuery } from "../../services/collectionApi";
import ScrollPositionManager from "../ScrollManager";
import { Link } from "react-router-dom";
import { BiSolidInfoCircle } from "react-icons/bi";

const CollectionCharacters = (props) => {
  const searchTerm = props?.searchTerm;
  const [characters, setCharacters] = useState([]);
  const limit = "30";
  const [offset, setOffset] = useState(0);

  const { data: charactersList, isFetching } = useGetCollectionCharactersQuery({
    searchTerm,
    limit,
    offset,
  });

  useEffect(() => {
    const fetchResults = charactersList?.data?.results;

    setCharacters(fetchResults || []);
    console.log(fetchResults);
  }, [charactersList]);

  if (isFetching) return <Loader />;
  return (
    <>
      {characters.length >= 1 && (
        <>
          <h1 className="capitalize text-start font-bold pt-8 text-lg">
            Characters
          </h1>
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
                      <div className={`uppercase  font-bold py-2  "`}>
                        {c.name}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CollectionCharacters;
