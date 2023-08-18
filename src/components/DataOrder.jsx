import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useGetEventsQuery } from "../services/eventsApi";
import moment from "moment";
import HTMLReactParser from "html-react-parser";
import { Autocomplete, TextField } from "@mui/material";
import Loader from "./Loader";

const DataOrder = () => {
  const { order } = useParams();
  const [orderBy, setOrderBy] = useState(order);
  const [label, setLabel] = useState(order);
  const limit = "100";
  const { data: eventsList, isFetching } = useGetEventsQuery({
    orderBy,
    limit,
  });
  const [events, setEvents] = useState([]);

  const [hoveredId, setHoveredId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    setIsHovered(true);
  };

  const Blur = () => {
    if (isHovered === true) return "backdrop-blur-xl blur-3xl rounded-xl";
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setIsHovered(false);
  };

  const handleChange = (event, newValue) => {
    const newOrderBy = newValue?.value;
    setOrderBy(newOrderBy);
    setLabel(newValue?.label);

    // Update the URL with the new order value
  };

  const options = [
    { label: "Newest", value: "-startDate" },
    { label: "Oldest", value: "startDate" },
    { label: "Ascending Order (A-Z)", value: "name" },
    { label: "Descending Order (Z-A)", value: "-name" },
    { label: "Last Modified", value: "modified" },
  ];

  // Fetch data when the "orderBy" value changes in the URL

  useEffect(() => {
    // Extract the data from eventsList only when it is available and not fetching
    if (eventsList && !isFetching) {
      const fetchResults = eventsList.data.results;
      setEvents(fetchResults);
      console.log(fetchResults);
    }
  }, [eventsList, isFetching]);

  if (isFetching) return <Loader />;

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        <h4 className="text-center">Marvel Events</h4>

        <div className="flex items-end justify-end text-black mb-7">
          <fieldset className="fieldset flex items-center justify-center gap-2">
            <label
              htmlFor="loe"
              className="text-white uppercase font-semibold font-mono"
            >
              Order By
            </label>
            <div className=" w-[225px] h-auto mt-1 rounded-lg">
              <Autocomplete
                disablePortal
                id="grading-system"
                options={options}
                // getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                className="uppercase rounded-lg focus:outline-none bg-slate-400"
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="Order By"
                    placeholder={label}
                    required
                    className="flex items-center justify-center placeholder:text-slate-950"
                  />
                )}
              />
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
          {events?.map((c) => (
            <div
              key={c.id}
              onMouseEnter={() => handleMouseEnter(c.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link key={c.id} to={`/events/${c.id}`} className="py-4">
                <div>
                  {c.id === hoveredId ? (
                    <>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className={`${Blur}`}
                        alt={"img of " + c.title}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className={`${"rounded-xl"}`}
                        alt={"img of " + c.title}
                      />
                    </>
                  )}
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

export default DataOrder;
