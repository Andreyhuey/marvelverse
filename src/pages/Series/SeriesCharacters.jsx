import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSeriesCharactersQuery } from "../../services/seriesApi";
import Loader from "../../components/Loader";
import { BiSolidInfoCircle } from "react-icons/bi";
import { Autocomplete, TextField } from "@mui/material";
import ScrollPositionManager from "../../components/ScrollManager";
import { CharactersComp } from "../../components";

const SeriesCharacters = () => {
  const { seriesId, title } = useParams();
  const [offset, setOffset] = useState(0);
  const limit = "16";

  // Use the route-specific data for state initialization
  const [orderBy, setOrderBy] = useState(
    sessionStorage.getItem(`orderBySeriesCharacters${seriesId}`) || "name"
  );

  // Data being fetched by redux toolkit
  const { data: charactersList, isFetching } = useGetSeriesCharactersQuery({
    seriesId,
    orderBy,
    limit,
    offset,
  });

  // Characters Array
  const [characters, setCharacters] = useState([]);
  const [total, setTotal] = useState(0);

  const [label, setLabel] = useState(
    sessionStorage.getItem(`labelBySeriesCharacters${seriesId}`) ||
      "Ascending Order (A-Z)"
  );

  //   Pagination useState(s)
  const [currentSeriesCharactersPage, setCurrentSeriesCharactersPage] =
    useState(
      parseInt(
        sessionStorage.getItem(`currentSeriesCharactersPage${seriesId}`)
      ) || 1
    );

  const handleChange = (event, newValue) => {
    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
    setCurrentSeriesCharactersPage(1);
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
    setOffset((currentSeriesCharactersPage - 1) * limit);
    console.log(fetchResults);
    sessionStorage.setItem(
      `currentSeriesCharactersPage${seriesId}`,
      currentSeriesCharactersPage
    );
    // Store relevant data in sessionStorage
    sessionStorage.setItem(`orderBySeriesCharacters${seriesId}`, orderBy); // Store orderBy
    sessionStorage.setItem(`labelBySeriesCharacters${seriesId}`, label);

    document.title = `${title} Characters | Events | Marvelverse`;
    document.body.scrollTop = 0;
  }, [
    charactersList,
    currentSeriesCharactersPage,
    orderBy,
    label,
    seriesId,
    title,
    limit,
  ]);

  // On component mount, retrieve stored data from sessionStorage
  useEffect(() => {
    const storedOrderBy = sessionStorage.getItem(
      `orderBySeriesCharacters${seriesId}`
    );
    const storedLabel = sessionStorage.getItem(
      `labelBySeriesCharacters${seriesId}`
    );

    if (storedOrderBy) {
      setOrderBy(storedOrderBy);
    }
    if (storedLabel) {
      setLabel(storedLabel);
    }
  }, [seriesId]);

  if (isFetching) return <Loader />;

  // Total Pages of Data Available
  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);

    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentSeriesCharactersPage(number);
    sessionStorage.setItem(`currentSeriesCharactersPage${seriesId}`, number);
  };

  function renderSmartPagination() {
    const totalPageCount = totalPages(); // Replace with your total number of pages
    const currentPage = currentSeriesCharactersPage; // Replace with your current page
    const screenWidth = window.innerWidth; // Get the screen width

    let visiblePageCount = 3; // Default visible page count

    if (screenWidth > 440) {
      visiblePageCount = 10; // Show more links on larger screens
    }

    const pageElements = [];

    const startPage = Math.max(
      currentPage - Math.floor(visiblePageCount / 2),
      1
    );
    const endPage = Math.min(startPage + visiblePageCount - 1, totalPageCount);

    if (startPage > 1) {
      pageElements.push(
        <li key={`page-1`}>
          <button
            className={`flex items-center justify-center px-2 md:px-3 h-8 leading-tight ${
              currentPage === 1
                ? "text-black bg-white"
                : "text-gray-500 bg-white border-gray-300 border-[1px] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
        </li>
      );

      if (startPage > 2) {
        pageElements.push(
          <span key="ellipsis-start" className="text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageElements.push(
        <li key={`page-${i}`}>
          <button
            className={`flex items-center justify-center px-2 md:px-3 h-8 leading-tight ${
              currentPage === i
                ? "text-black bg-white"
                : "text-gray-500 bg-white border-gray-300 border-[1px] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPageCount) {
      if (endPage < totalPageCount - 1) {
        pageElements.push(
          <span key="ellipsis-end" className="text-gray-500">
            ...
          </span>
        );
      }
      pageElements.push(
        <li key={`page-${totalPageCount}`}>
          <button
            className={`flex items-center justify-center px-2 md:px-3 h-8 leading-tight ${
              currentPage === totalPageCount
                ? "text-black bg-white"
                : "text-gray-500 bg-white border-gray-300 border-[1px] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handlePageClick(totalPageCount)}
          >
            {totalPageCount}
          </button>
        </li>
      );
    }

    return pageElements;
  }

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        <div className="text-center text-[26px] py-6 font-[700]">
          {title} Characters
        </div>

        {total > limit && (
          <div className="flex items-center justify-center">
            <p className="border rounded p-2 bg-black">
              Page {currentSeriesCharactersPage} of {totalPages()}
            </p>
          </div>
        )}

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

        <CharactersComp characters={characters} />

        {total > limit && (
          <div className="flex justify-center  mt-4 py-12 max-w-full">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-md">
                <li>
                  <button
                    className="flex items-center justify-center px-2 md:px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() =>
                      handlePageClick(currentSeriesCharactersPage - 1)
                    }
                    disabled={currentSeriesCharactersPage === 1}
                  >
                    Prev
                  </button>
                </li>
                {renderSmartPagination()}
                <li>
                  <button
                    className="flex items-center justify-center px-2 md:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() =>
                      handlePageClick(currentSeriesCharactersPage + 1)
                    }
                    disabled={currentSeriesCharactersPage === totalPages()}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesCharacters;
