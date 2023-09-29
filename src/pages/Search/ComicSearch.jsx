import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSearchComicsQuery } from "../../services/searchApi";
import Loader from "../../components/Loader";
import ScrollPositionManager from "../../components/ScrollManager";
import { BiSolidInfoCircle } from "react-icons/bi";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Autocomplete, TextField } from "@mui/material";

const ComicSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [orderBy, setOrderBy] = useState(
    sessionStorage.getItem(`orderByComics${searchTerm}`) || "-modified"
  );

  const [label, setLabel] = useState(
    sessionStorage.getItem(`labelComics${searchTerm}`) || "Recently Modified"
  );

  const limit = "12";
  const [offset, setOffset] = useState("");

  const { data: comicsList, isFetching } = useGetSearchComicsQuery({
    searchTerm,
    orderBy,
    limit,
    offset,
  });

  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState(0);

  const [currentComicsSearchPage, setCurrentComicsSearchPage] = useState(
    parseInt(
      sessionStorage.getItem(`currentComicsSearchPage${searchTerm}`) || 1
    )
  );

  const handleChange = (event, newValue) => {
    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
    setCurrentComicsSearchPage(1);
  };

  // useEffect to fetch the comicsList and sort it
  useEffect(() => {
    const fetchResults = comicsList?.data?.results;
    setTotal(comicsList?.data.total);
    setComics(fetchResults || []);
    setComics(fetchResults || []);
    setOffset((currentComicsSearchPage - 1) * limit);
    console.log(fetchResults);

    // Store relevant data in sessionStorage
    sessionStorage.setItem(
      `currentComicsSearchPage${searchTerm}`,
      currentComicsSearchPage
    );
    sessionStorage.setItem(`orderByComics${searchTerm}`, orderBy); // Store orderBy
    sessionStorage.setItem(`labelComics${searchTerm}`, label);

    document.title = `Comics | Marvel-Verse `;
  }, [comicsList, orderBy, label, limit, currentComicsSearchPage, searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    // Update the search term state

    setSearchTerm(event.target.value);
  };

  const options = [
    { label: "Ascending Order (A-Z)", value: "title" },
    { label: "Descending Order (Z-A)", value: "-title" },
    { label: "Oldest Issue", value: "issueNumber" },
    { label: "Latest Issue", value: "-issueNumber" },
    { label: "Old", value: "modified" },
    { label: "Recently Modified", value: "-modified" },
    { label: "Final Order Cutoff (FOC)", value: "focDate" },
    { label: "Latest Final Order Cutoff (FOC)", value: "-focDate" },
    { label: "Oldest On Sale", value: "onsaleDate" },
    { label: "Latest On Sale", value: "-onsaleDate" },
  ];

  // On component mount, retrieve stored data from sessionStorage
  useEffect(() => {
    const storedOrderBy = sessionStorage.getItem(`orderByComics${searchTerm}`);
    const storedLabel = sessionStorage.getItem(`labelComics${searchTerm}`);

    if (storedOrderBy) {
      setOrderBy(storedOrderBy);
    }
    if (storedLabel) {
      setLabel(storedLabel);
    }
  }, [searchTerm]);

  // Total Pages of Data Available
  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentComicsSearchPage(number);
    sessionStorage.setItem(`currentComicsSearchPage`, number);
  };

  function renderSmartPagination() {
    const totalPageCount = totalPages(); // Replace with your total number of pages
    const currentPage = currentComicsSearchPage; // Replace with your current page
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

  // Loading state
  if (isFetching) return <Loader />;

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        <div className="text-center text-[26px] py-6 font-[700]">Comics</div>

        <div className="flex items-center justify-center">
          <p className="border rounded p-2 bg-black font-mono">
            Page {currentComicsSearchPage} of {totalPages()}
          </p>
        </div>

        <div className="flex md:flex-row flex-col items-center justify-between py-4 gap-5">
          <div className="flex items-start justify-start">
            <form
              className="w-[225px] h-auto rounded-lg"
              onSubmit={handleSearch}
            >
              <input
                className="text-black"
                minLength="5"
                type="search"
                value={searchTerm}
                placeholder="Spider.."
                onChange={(event) => setSearchTerm(event.target.value)}
                required
              />
              <button
                className="btn btn-primary my-2 my-sm-0"
                type="submit"
                value="submit"
              >
                Search
              </button>
            </form>
          </div>
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
            <div
              key={c.id}
              className={` ${isFetching ? "animate-pulse" : ""} `}
            >
              <div className="transition-transform transform hover:scale-110 font-mono relative group cursor-pointer py-2">
                <ScrollPositionManager scrollKey={`${c.id + c.diamondCode}`} />
                <Link
                  key={c.id}
                  to={`/comics/${c.id}/${c.title}`}
                  className="py-4"
                >
                  <div className={` relative`}>
                    <>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className={`${"rounded-xl w-full"}`}
                        alt={"img of " + c.title}
                      />
                    </>

                    {c.description ? (
                      <div className="text-xl font-bold p-2 font-mono absolute bottom-2 left-0 text-green-500 rounded-br-xl rounded-tl-md">
                        <BiSolidInfoCircle />
                      </div>
                    ) : (
                      <div className="text-xl font-bold p-2 font-mono absolute bottom-2 left-0 text-red-500 rounded-br-xl rounded-tl-md">
                        <BiSolidInfoCircle />
                      </div>
                    )}
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

        <div className="flex justify-center  mt-4 py-12 max-w-full">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-md">
              <li>
                <button
                  className="flex items-center justify-center px-2 md:px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageClick(currentComicsSearchPage - 1)}
                  disabled={currentComicsSearchPage === 1}
                >
                  Prev
                </button>
              </li>
              {renderSmartPagination()}
              <li>
                <button
                  className="flex items-center justify-center px-2 md:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageClick(currentComicsSearchPage + 1)}
                  disabled={currentComicsSearchPage === totalPages()}
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

export default ComicSearch;