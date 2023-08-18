import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../services/eventsApi";
import HTMLReactParser from "html-react-parser";
import Loader from "./Loader";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";

const Data = () => {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = "16";
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState(
    sessionStorage.getItem("orderByEvents") || "name"
  );
  const [label, setLabel] = useState(
    sessionStorage.getItem("labelEvents") || "Ascending Order (A-Z)"
  );
  const [loading, setLoading] = useState(true);
  const { data: eventsList, isFetching } = useGetEventsQuery({
    orderBy,
    offset,
    limit,
  });

  // const [hoveredId, setHoveredId] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);

  // // To set the hovered Id once the mouse touches it
  // const handleMouseEnter = (id) => {
  //   setHoveredId(id);
  //   setIsHovered(true);
  // };

  // // The css function enacted on the ID
  // const Blur = () => {
  //   if (isHovered === true)
  //     return "backdrop-blur-3xl backdrop-brightness-0 blur-xl rounded-2xl";
  // };

  // // the mouse leaving the hover
  // const handleMouseLeave = () => {
  //   setHoveredId(null);
  //   setIsHovered(false);
  // };

  //   Pagination useState(s)
  const [currentEventPage, setCurrentEventPage] = useState(
    parseInt(sessionStorage.getItem("currentEventPage")) || 1
  );

  // handleChange for the Order
  const handleChange = (event, newValue) => {
    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
    setCurrentEventPage(1);
  };

  // Options for the Order
  const options = [
    { label: "Newest", value: "-startDate" },
    { label: "Oldest", value: "startDate" },
    { label: "Ascending Order (A-Z)", value: "name" },
    { label: "Descending Order (Z-A)", value: "-name" },
    { label: "Modified", value: "modified" },
  ];

  // UseEffect used to fetch and set Total, count and offset
  useEffect(() => {
    const fetchResults = eventsList?.data?.results;
    setEvents(fetchResults || []);
    setTotal(eventsList?.data?.total);
    setCount(eventsList?.data?.count);
    setOffset((currentEventPage - 1) * limit);
    console.log(fetchResults);
    sessionStorage.setItem("currentEventPage", currentEventPage);
    // Store relevant data in sessionStorage
    sessionStorage.setItem("orderByEvents", orderBy); // Store orderBy
    sessionStorage.setItem("labelEvents", label);

    document.title =
      "Events | Marvel-Verse - The Official Marvel site for Marvel's Vast Library";
    setLoading(false);
  }, [eventsList, orderBy, limit, currentEventPage]);

  // On component mount, retrieve stored data from sessionStorage
  useEffect(() => {
    const storedOrderBy = sessionStorage.getItem("orderByEvents");
    const storedLabel = sessionStorage.getItem("labelEvents");

    if (storedOrderBy) {
      setOrderBy(storedOrderBy);
    }
    if (storedLabel) {
      setLabel(storedLabel);
    }
  }, []);

  // ...Loading Content ...

  if (isFetching) return <Loader />;

  // Total Pages of Data Available
  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentEventPage(number);
    sessionStorage.setItem(currentEventPage, number);
  };

  return (
    <div>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="bg-gray-950 text-white py-20 px-4 md:px-8 lg:px-20">
          {/* <div className="text-center uppercase font-mono py-6">
          Marvel Events
        </div> */}

          <div className="flex items-start justify-between py-4">
            <div className="border rounded p-2 bg-black">
              <p>
                Page {currentEventPage} of {totalPages()}
              </p>
            </div>
            <div className="flex items-start justify-end text-black mb-7">
              <fieldset className="fieldset flex items-center flex-col justify-center gap-2">
                <label
                  htmlFor="loe"
                  className="text-white uppercase font-semibold font-mono"
                >
                  Order By
                </label>
                <div className=" w-[225px] h-auto mt-1 rounded-lg bg-slate-600">
                  <Autocomplete
                    disablePortal
                    id=""
                    options={options}
                    // getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    className="rounded-lg focus:outline-none "
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Order By"
                        placeholder={label}
                        required
                        className="flex items-center justify-center  text-white"
                      />
                    )}
                  />
                </div>
              </fieldset>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
            {events?.map((c) => (
              <div
                key={c.id}
                // onMouseEnter={() => handleMouseEnter(c.id)}
                // onMouseLeave={handleMouseLeave}
                className={` 
                 transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2`}
              >
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

          <div className="flex justify-center overflow-auto mt-4 py-12">
            <nav aria-label="Page navigation example ">
              <ul className="inline-flex -space-x-px text-md">
                <li>
                  <button
                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => handlePageClick(currentEventPage - 1)}
                    disabled={currentEventPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages() }, (_, i) => i + 1).map(
                  (number) => (
                    <li key={number}>
                      <button
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                          currentEventPage === number
                            ? "text-black bg-white"
                            : "text-gray-500 bg-white border-gray-300 border-[1px] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                        onClick={() => handlePageClick(number)}
                      >
                        {number}
                      </button>
                    </li>
                  )
                )}
                <li>
                  <button
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => handlePageClick(currentEventPage + 1)}
                    disabled={currentEventPage === totalPages()}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Data;
