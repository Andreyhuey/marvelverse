import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useGetCollectionEventsQuery } from "../../services/collectionApi";
import EventsComp from "../pageComp/EventsComp";

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
          <EventsComp searchTerm={searchTerm} events={events} />
        </>
      )}
    </>
  );
};

export default CollectionEvents;
