import React, { useState, useEffect } from "react";
import { useGetSearchEventsQuery } from "../../services/searchApi";
import { EventsComp, Loader } from "../../components";
import { eventsOptions } from "../../data";

const EventSearch = ({ searchTerm, simplified }) => {
  const options = eventsOptions;
  const [orderBy, setOrderBy] = useState(options[0]?.value);
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = simplified ? 20 : 100;

  const { data: eventsList, isFetching } = useGetSearchEventsQuery({
    searchTerm,
    limit,
    offset,
    orderBy,
  });

  useEffect(() => {
    const fetchResults = eventsList?.data?.results;

    setEvents(fetchResults || []);
    console.log(fetchResults);
  }, [eventsList]);

  if (isFetching) return <Loader />;

  return (
    <div>
      {simplified && (
        <>
          {events > 0 && <span className="border-t-2 border-red-500 py-10" />}
        </>
      )}

      <EventsComp events={events} searchTerm={searchTerm} />
    </div>
  );
};

export default EventSearch;
