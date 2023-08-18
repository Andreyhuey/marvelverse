import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useGetEventComicsQuery } from "../services/eventsApi";
import Loader from "./Loader";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const DataComics = () => {
  const { eventId, title } = useParams();
  // Determine the route-specific data to use

  // Use the route-specific data for state initialization
  const [orderBy, setOrderBy] = useState(
    sessionStorage.getItem(`orderByEventComics${eventId}`) || "title"
  );
  const [label, setLabel] = useState(
    sessionStorage.getItem(`labelByEventComics${eventId}`) ||
      "Ascending Order (A-Z)"
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

  // const [hoveredId, setHoveredId] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);

  // handle the mouse movement

  // const handleMouseEnter = (id) => {
  //   setHoveredId(id);
  //   setIsHovered(true);
  // };

  // const Blur = () => {
  //   if (isHovered === true) return "backdrop-blur-xl blur-3xl rounded-xl";
  // };

  // const handleMouseLeave = () => {
  //   setHoveredId(null);
  //   setIsHovered(false);
  // };

  //   Pagination useState(s)
  const [currentEventComicsPage, setCurrentEventComicsPage] = useState(
    parseInt(sessionStorage.getItem(`currentEventComicsPage${eventId}`)) || 1
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
    sessionStorage.setItem(
      `currentEventComicsPage${eventId}`,
      currentEventComicsPage
    );
    sessionStorage.setItem(`orderByEventComics${eventId}`, orderBy); // Store orderBy
    sessionStorage.setItem(`labelByEventComics${eventId}`, label);

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
    const storedOrderBy = sessionStorage.getItem(
      `orderByEventComics${eventId}`
    );
    const storedLabel = sessionStorage.getItem(`labelByEventComics${eventId}`);

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
    sessionStorage.setItem(`currentEventComicsPage${eventId}`, number);
  };

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        <div className="text-center text-[26px] py-6 font-[700]">
          {title} Comics
        </div>

        <div className="flex items-center justify-center">
          <p className="border rounded p-2 bg-black">
            Page {currentEventComicsPage} of {totalPages()}
          </p>
        </div>

        <div className="flex md:flex-row flex-col items-center justify-end py-4 gap-5">
          <div className="flex items-start justify-end text-black mb-7">
            <fieldset className="fieldset flex items-center flex-col justify-center gap-2">
              <div className=" w-[225px] h-auto mt-1 rounded-lg bg-transparent">
                <Autocomplete
                  disablePortal
                  options={options}
                  getOptionLabel={(option) => option.label}
                  className="capitalize rounded-xl focus-within:none bg-transparent"
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="Order By"
                      placeholder={label}
                      variant="outlined"
                      id="outlined-basic"
                      required
                      className="flex items-center justify-center bg-slate-600 text-white rounded-lg"
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
              <div className="transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2">
                <Link
                  key={c.id}
                  // to={`/characters/${c.title}/${c.id}`}
                  className="py-4"
                >
                  <div
                    className={` relative`}
                    // onMouseEnter={() => handleMouseEnter(c.id)}
                    // onMouseLeave={handleMouseLeave}
                  >
                    <>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className={`${"rounded-xl w-full"}`}
                        alt={"img of " + c.title}
                      />
                    </>

                    <div className="uppercase  font-bold p-2 font-mono text-white absolute bottom-0 right-0 bg-red-500 rounded-br-xl rounded-tl-md">
                      ${c.prices[0].price <= 5 ? 8.35 : c.prices[0].price}
                    </div>
                  </div>
                  <div className="px-2 pb-2 flex items-center justify-center">
                    <div
                      className={`uppercase  font-bold py-2 font-mono text-[#a7a4a4] text-center"`}
                    >
                      {c.title}
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
