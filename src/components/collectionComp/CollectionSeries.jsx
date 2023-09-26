import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCollectionSeriesQuery } from "../../services/collectionApi";
import { BiSolidInfoCircle } from "react-icons/bi";
import { Loader } from "../../components";
import ScrollPositionManager from "../../components/ScrollManager";

function CollectionSeries(props) {
  const searchTerm = props?.searchTerm;
  const [series, setSeries] = useState([]);
  const limit = "12";
  const [offset, setOffset] = useState(0);

  const { data: seriesList, isFetching } = useGetCollectionSeriesQuery({
    searchTerm,
    limit,
    offset,
  });

  useEffect(() => {
    const fetchResults = seriesList?.data?.results;

    setSeries(fetchResults || []);
    console.log(fetchResults);
  }, [seriesList]);

  if (isFetching) return <Loader />;

  return (
    <>
      {series.length >= 1 && (
        <>
          <h1 className="capitalize text-start font-bold pt-8 text-lg">
            Series
          </h1>
        </>
      )}

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
    </>
  );
}

export default CollectionSeries;
