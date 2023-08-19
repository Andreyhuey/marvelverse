import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetEventCharactersQuery } from "../services/eventsApi";
import Loader from "./Loader";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import ScrollPositionManager from "../components/ScrollManager";

const DataCharacters = () => {
  const { eventId, title } = useParams();
  const [offset, setOffset] = useState(0);
  const limit = "20";

  // Use the route-specific data for state initialization
  const [orderBy, setOrderBy] = useState(
    sessionStorage.getItem(`orderByEventCharacters${eventId}`) || "name"
  );

  // Data being fetched by redux toolkit
  const { data: charactersList, isFetching } = useGetEventCharactersQuery({
    eventId,
    orderBy,
    limit,
    offset,
  });

  // Characters Array
  const [characters, setCharacters] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState("");

  const [label, setLabel] = useState(
    sessionStorage.getItem(`labelByEventCharacters${eventId}`) ||
      "Ascending Order (A-Z)"
  );

  //   Pagination useState(s)
  const [currentEventCharactersPage, setCurrentEventCharactersPage] = useState(
    parseInt(sessionStorage.getItem(`currentEventCharactersPage${eventId}`)) ||
      1
  );

  const handleChange = (event, newValue) => {
    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
    setCurrentEventCharactersPage(1);
  };

  // Options for the Order
  const options = [
    { label: "Ascending Order (A-Z)", value: "name" },
    { label: "Descending Order (Z-A)", value: "-name" },
    { label: "Oldest", value: "modified" },
    { label: "Recently Modified", value: "-modified" },
  ];

  // UseEffect used to fetch and set total, count and offset
  useEffect(() => {
    const fetchResults = charactersList?.data?.results;
    setCharacters(fetchResults || []);
    setTotal(charactersList?.data?.total);
    setCount(charactersList?.data?.count);
    setOffset((currentEventCharactersPage - 1) * limit);
    console.log(fetchResults);
    sessionStorage.setItem(
      `currentEventCharactersPage${eventId}`,
      currentEventCharactersPage
    );
    // Store relevant data in sessionStorage
    sessionStorage.setItem(`orderByEventCharacters${eventId}`, orderBy); // Store orderBy
    sessionStorage.setItem(`labelByEventCharacters${eventId}`, label);

    document.title = `${title} Characters | Events | Marvel-Verse`;
  }, [
    charactersList,
    currentEventCharactersPage,
    orderBy,
    eventId,
    title,
    limit,
  ]);

  // On component mount, retrieve stored data from sessionStorage
  useEffect(() => {
    const storedOrderBy = sessionStorage.getItem(
      `orderByEventCharacters${eventId}`
    );
    const storedLabel = sessionStorage.getItem(
      `labelByEventCharacters${eventId}`
    );

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
    setCurrentEventCharactersPage(number);
    sessionStorage.setItem(`currentEventCharactersPage${eventId}`, number);
  };

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        <div className="text-center text-[26px] py-6 font-[700]">
          {title} Characters
        </div>

        <div className="flex items-center justify-center">
          <p className="border rounded p-2 bg-black">
            Page {currentEventCharactersPage} of {totalPages()}
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

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
            {characters ? (
              characters?.map((c) => (
                <div key={c.id}>
                  <ScrollPositionManager scrollKey={c.id} />
                  <div className="transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2">
                    <Link
                      key={c.id}
                      to={`/characters/${c.id}/${c.name}`}
                      className="py-4"
                    >
                      <div
                        className={`  `}
                        // onMouseEnter={() => handleMouseEnter(c.id)}
                        // onMouseLeave={handleMouseLeave}
                      >
                        <>
                          <img
                            src={c.thumbnail.path + ".jpg"}
                            className={`${"rounded-xl"}`}
                            alt={"img of " + c.name}
                          />
                        </>

                        <div className="px-2 pb-2">
                          <div className={`uppercase  font-bold py-2  "`}>
                            {c.name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-[90vh]"></div>
            )}
          </div>

          {/* Pagination example */}

          <div className="flex justify-center overflow-auto mt-4 py-12">
            <nav aria-label="Page navigation example ">
              <ul className="inline-flex -space-x-px text-md">
                <li>
                  <button
                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() =>
                      handlePageClick(currentEventCharactersPage - 1)
                    }
                    disabled={currentEventCharactersPage === 1}
                  >
                    Prev
                  </button>
                </li>
                {Array.from({ length: totalPages() }, (_, i) => i + 1).map(
                  (number) => (
                    <li key={number}>
                      <button
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                          currentEventCharactersPage === number
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
                    onClick={() =>
                      handlePageClick(currentEventCharactersPage + 1)
                    }
                    disabled={currentEventCharactersPage === totalPages()}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* If there is no data  */}
      </div>
    </div>
  );
};

export default DataCharacters;
