import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCharacterSeriesQuery } from "../../services/charactersApi";
import Loader from "../../components/Loader";
import { Autocomplete, TextField } from "@mui/material";
import ScrollPositionManager from "../../components/ScrollManager";
import { BiSolidInfoCircle } from "react-icons/bi";
import { SeriesComp } from "../../components";

const CharacterSeries = () => {
  const { characterId, name } = useParams();
  const [series, setSeries] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = "16";
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState(
    sessionStorage.getItem(`orderByCharacterSeries${characterId}`) || "title"
  );
  const [label, setLabel] = useState(
    sessionStorage.getItem(`labelCharacterSeries${characterId}`) ||
      "Ascending Order (A-Z)"
  );

  // data fetched from character Api
  const { data: seriesList, isFetching } = useGetCharacterSeriesQuery({
    characterId,
    orderBy,
    offset,
    limit,
  });

  //   Pagination useState(s)
  const [currentCharacterSeriesPage, setCurrentCharacterSeriesPage] = useState(
    parseInt(
      sessionStorage.getItem(`currentCharacterSeriesPage${characterId}`)
    ) || 1
  );

  // Options for the Order
  const options = [
    { label: "Start Year", value: "startYear" },
    { label: "Ascending Order (A-Z)", value: "title" },
    { label: "Descending Order (Z-A)", value: "-title" },
    { label: "Old", value: "modified" },
    { label: "Newest", value: "-modified" },
  ];

  // handleChange for the Order
  const handleChange = (event, newValue) => {
    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
    setCurrentCharacterSeriesPage(1);
  };

  // UseEffect used to fetch and set Total, count and offset
  useEffect(() => {
    const fetchResults = seriesList?.data?.results;
    setSeries(fetchResults || []);
    setTotal(seriesList?.data?.total);
    setOffset((currentCharacterSeriesPage - 1) * limit);
    console.log(fetchResults);

    // Store relevant data in session storage
    sessionStorage.setItem(
      `currentCharacterSeriesPage${characterId}`,
      currentCharacterSeriesPage
    );
    // Store relevant data in sessionStorage
    sessionStorage.setItem(`orderByCharacterSeries${characterId}`, orderBy); // Store orderBy
    sessionStorage.setItem(`labelByCharacterSeries${characterId}`, label);

    document.title = `${name} | Series | Marvelverse - The Official Marvel site for Marvel's Vast Library`;
  }, [
    seriesList,
    orderBy,
    label,
    limit,
    currentCharacterSeriesPage,
    name,
    characterId,
  ]);

  // On component mount, retrieve stored data from sessionStorage
  useEffect(() => {
    const storedOrderBy = sessionStorage.getItem(
      `orderByCharacterSeries${characterId}`
    );
    const storedLabel = sessionStorage.getItem(
      `labelByCharacterSeries${characterId}`
    );

    if (storedOrderBy) {
      setOrderBy(storedOrderBy);
    }
    if (storedLabel) {
      setLabel(storedLabel);
    }
  }, [characterId]);

  // ...Loading Content ...

  if (isFetching) return <Loader />;

  // Total Pages of Data Available
  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentCharacterSeriesPage(number);
    sessionStorage.setItem(`currentCharacterSeriesPage${characterId}`, number);
  };

  function renderSmartPagination() {
    const totalPageCount = totalPages(); // Replace with your total number of pages
    const currentPage = currentCharacterSeriesPage; // Replace with your current page
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
      <div className="bg-gray-950 text-white py-20 px-4 md:px-8 lg:px-20">
        <div className="text-center text-[26px] py-6 font-[700]">
          {name} Series
        </div>

        <div className="flex items-center justify-center">
          <p className="border rounded p-2 bg-black">
            Page {currentCharacterSeriesPage} of {totalPages()}
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

        <SeriesComp series={series} />

        {/* Pagination example */}

        <div className="flex justify-center  mt-4 py-12 max-w-full">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-md">
              <li>
                <button
                  className="flex items-center justify-center px-2 md:px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() =>
                    handlePageClick(currentCharacterSeriesPage - 1)
                  }
                  disabled={currentCharacterSeriesPage === 1}
                >
                  Prev
                </button>
              </li>
              {renderSmartPagination()}
              <li>
                <button
                  className="flex items-center justify-center px-2 md:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() =>
                    handlePageClick(currentCharacterSeriesPage + 1)
                  }
                  disabled={currentCharacterSeriesPage === totalPages()}
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

export default CharacterSeries;
