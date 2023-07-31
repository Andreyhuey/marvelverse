import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../services/eventsApi";
import Loader from "./Loader";
import moment from "moment";
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Data = () => {
  const [orderBy, setOrderBy] = useState("-startDate");
  const limit = "100";
  const { data: eventsList, isFetching } = useGetEventsQuery({
    orderBy,
    limit,
  });
  const [events, setEvents] = useState([]);

  const handleChange = (event, value) => {
    setOrderBy(value);
  };

  useEffect(() => {
    const fetchResults = eventsList?.data?.results;
    console.log(fetchResults);
    setEvents(fetchResults || []);
  }, [eventsList, orderBy]);

  if (isFetching) return <Loader />;

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 lg:px-20">
        <h4 className="text-center">Events</h4>

        <div className="flex items-end justify-end text-black mb-7">
          <fieldset className="fieldset">
            <label htmlFor="loe" className="text-white">
              Order By
            </label>
            <div className="bg-slate-400 w-[300px] mt-1 rounded-sm">
              <Autocomplete
                disablePortal
                id="grading-system"
                options={[
                  "name",
                  "startDate",
                  "modified",
                  "-name",
                  "-startDate",
                ]}
                className="uppercase w-full mt-2 rounded-lg focus:outline-none"
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="Order By"
                    placeholder={orderBy}
                    required
                    className="flex items-center justify-center"
                  />
                )}
              />
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
          {events?.map((c) => (
            <div key={c.id}>
              <Link key={c.id} to={`/events/${c.id}`} className="py-4">
                <div className="py-2">
                  <img
                    src={c.thumbnail.path + ".jpg"}
                    className="rounded-xl"
                    alt={"img of " + c.title}
                  />
                </div>
                <div className="uppercase font-bold h-[48px]">{c.title}</div>
                <div className="font-mono font-bold text-[#a7a4a4]">
                  {c.start ? moment(c.start).format("YYYY") : "Nill"}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
