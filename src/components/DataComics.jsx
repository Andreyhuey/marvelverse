import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useGetEventComicsQuery } from "../services/eventsApi";
import Loader from "./Loader";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const routeSpecificDataMap = {
  "/events": { orderBy: "name" },
  "/events/:eventId/:title/characters": { orderBy: "name" },
  "/events/:eventId/:title/comics": { orderBy: "title" },
  "/events/:eventId/:title/creators": { orderBy: "firstName" },
  // Add more route-specific data here...
  // Default route-specific data if no match is found
  default: { orderBy: "default" },
};

const DataComics = () => {
  const location = useLocation();
  const { eventId, title } = useParams();
  // Determine the route-specific data to use
  const routeSpecificData =
    routeSpecificDataMap[location.pathname] || routeSpecificDataMap.default;

  // Use the route-specific data for state initialization
  const [orderBy, setOrderBy] = useState(
    sessionStorage.getItem("orderBy") || routeSpecificData.orderBy
  );
  const [label, setLabel] = useState(
    sessionStorage.getItem("label") || "Ascending Order (A-Z)"
  );
  const limit = "12";
  const [count, setCount] = useState("");
  const [offset, setOffset] = useState(0);

  const { data: comicsList, isFetching } = useGetEventComicsQuery({
    eventId,
    orderBy,
    limit,
    offset,
  });
  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // handle the mouse movement

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

  //   Pagination useState(s)
  const [currentEventComicsPage, setCurrentEventComicsPage] = useState(
    parseInt(sessionStorage.getItem("currentEventComicsPage")) || 1
  );

  // handleChange for the Order
  const handleChange = (event, newValue) => {
    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
    setCurrentEventComicsPage(1);
  };

  // useEffect to fetch the comicsList and sort it
  useEffect(() => {
    const fetchResults = comicsList?.data?.results;
    setTotal(comicsList?.data?.total);
    setComics(fetchResults || []);
    setTotal(comicsList?.data?.total);
    setCount(comicsList?.data?.count);
    setOffset((currentEventComicsPage - 1) * limit);
    console.log(fetchResults);

    // Store relevant data in sessionStorage
    sessionStorage.setItem("currentEventComicsPage", currentEventComicsPage);
    sessionStorage.setItem("orderBy", orderBy); // Store orderBy
    sessionStorage.setItem("label", label);

    document.title = `${title} Comics | Events | Marvel-Verse `;
  }, [comicsList, orderBy, label, limit, currentEventComicsPage]);

  const options = [
    { label: "Ascending Order (A-Z)", value: "title" },
    { label: "Descending Order (Z-A)", value: "-title" },
    { label: "Oldest Issue", value: "issueNumber" },
    { label: "Latest Issue", value: "-issueNumber" },
    { label: "Oldest Modified", value: "modified" },
    { label: "Recently Modified", value: "-modified" },
    { label: "Final Order Cutoff (FOC)", value: "focDate" },
    { label: "Latest Final Order Cutoff (FOC)", value: "-focDate" },
    { label: "Oldest On Sale", value: "onsaleDate" },
    { label: "Latest On Sale", value: "-onsaleDate" },
  ];

  // On component mount, retrieve stored data from sessionStorage
  useEffect(() => {
    const storedOrderBy = sessionStorage.getItem("orderBy");
    const storedLabel = sessionStorage.getItem("label");

    if (storedOrderBy) {
      setOrderBy(storedOrderBy);
    }
    if (storedLabel) {
      setLabel(storedLabel);
    }
  }, []);

  if (isFetching) return <Loader />;

  // Total Pages of Data Available
  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentEventComicsPage(number);
    sessionStorage.setItem(currentEventComicsPage, number);
  };

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        {/* <h4 className="text-center">Event Comics</h4> */}

        <div className="flex items-start justify-between py-4">
          <div className="flex flex-col gap-4 font-serif">
            <p>Total Comics Found: {total}</p>
            <p>Total Rendered : {count}</p>
          </div>
          <div className="border rounded p-2 bg-[#1b135f69] font-semibold">
            <p>
              Page {currentEventComicsPage} of {totalPages()}
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
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
          {comics?.map((c) => (
            <div key={c.id} className="">
              <div className="hover:p-1  font-mono relative group cursor-pointer">
                <Link key={c.id} to={`/events/${c.id}`} className="py-4">
                  <div
                    className={` ${
                      c.id === hoveredId
                        ? "py-2 font-mono rounded-xl bg-gray-900 "
                        : "py-2 font-mono"
                    } `}
                    onMouseEnter={() => handleMouseEnter(c.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {c.id === hoveredId ? (
                      <>
                        <img
                          src={c.thumbnail.path + ".jpg"}
                          className={`${Blur} w-full`}
                          alt={"img of " + c.title}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={c.thumbnail.path + ".jpg"}
                          className={`${"rounded-xl w-full"}`}
                          alt={"img of " + c.title}
                        />
                      </>
                    )}

                    {c.description ? (
                      <div className="tooltip  text-white px-3 pb-3 pt-7 text-md opacity-0 group-hover:opacity-100 absolute bottom-0 top-0 left-1/2 mb-2 transform -translate-x-1/2 pointer-events-none transition-opacity rounded-xl flex flex-col items-start justify-start w-full h-full">
                        <p className="line-clamp-[15] font-serif">
                          {HTMLReactParser(c.description)}
                        </p>
                      </div>
                    ) : (
                      <div className="tooltip p-2 text-md rounded opacity-0 group-hover:opacity-100 absolute  top-0  left-1/2 transform -translate-x-1/2 pointer-events-none transition-opacity  w-full h-full  flex flex-col items-center justify-center gap-5">
                        <p className="font-extrabold text-xl text-center">
                          No description provided.
                        </p>
                      </div>
                    )}
                    <div className="px-2 pb-2 flex items-center justify-between">
                      <div
                        className={`uppercase  font-bold py-2 font-mono text-[#a7a4a4] "`}
                      >
                        {c.format}
                      </div>
                      <div className="uppercase  font-bold py-2 font-mono text-[#a7a4a4] ">
                        ${c.prices[0].price <= 5 ? 9.99 : c.prices[0].price}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination example */}
        <div className="flex justify-center overflow-auto mt-4 py-12">
          <nav aria-label="Page navigation example ">
            <ul className="inline-flex -space-x-px text-md">
              <li>
                <button
                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageClick(currentEventComicsPage - 1)}
                  disabled={currentEventComicsPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages() }, (_, i) => i + 1).map(
                (number) => (
                  <li key={number}>
                    <button
                      className={`flex items-center justify-center px-3 h-8 leading-tight ${
                        currentEventComicsPage === number
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
                  onClick={() => handlePageClick(currentEventComicsPage + 1)}
                  disabled={currentEventComicsPage === totalPages()}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DataComics;
