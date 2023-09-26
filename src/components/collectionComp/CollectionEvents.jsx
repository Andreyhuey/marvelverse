import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useGetCollectionEventsQuery } from "../../services/collectionApi";
import ScrollPositionManager from "../ScrollManager";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const CollectionEvents = (props) => {
  const searchTerm = props?.searchTerm;
  const [events, setEvents] = useState([]);
  const limit = "20";
  const [offset, setOffset] = useState(0);

  const { data: eventList, isFetching } = useGetCollectionEventsQuery({
    searchTerm,
    limit,
    offset,
  });

  useEffect(() => {
    const fetchResults = eventList?.data?.results;

    setEvents(fetchResults || []);
    console.log(fetchResults);
  }, [eventList]);

  if (isFetching) return <Loader />;

  return (
    <>
      {events.length >= 1 && (
        <>
          <h1 className="capitalize text-start font-bold pt-8 text-lg">
            Events
          </h1>
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
        </>
      )}
    </>
  );
};

export default CollectionEvents;
