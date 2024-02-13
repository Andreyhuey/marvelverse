import React, { useState, useEffect } from "react";
import CharacterSearch from "./CharacterSearch";
import ComicSearch from "./ComicSearch";
import EventSearch from "./EventSearch";
import SeriesSearch from "./SeriesSearch";
import ScrollPositionManager from "../../components/ScrollManager";
import { searchStructure } from "../../data";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem(`searchPageSearchTerm`) || ""
  );
  const [searchQuery, setSearchQuery] = useState(searchTerm || "");

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(searchQuery);
    sessionStorage.setItem(`searchPageSearchTerm`, searchQuery);
  };

  const [tabIndex, setTabIndex] = useState(1);

  const nextTab = (index) => {
    setTabIndex(index);
  };

  //
  useEffect(() => {
    sessionStorage.setItem(`searchPageSearchTerm`, searchQuery);
  }, [searchTerm, searchQuery]);

  return (
    <div className="bg-gray-950 text-white flex flex-col min-h-screen  py-10 px-4 md:px-8 lg:px-20">
      <>
        <form onSubmit={handleSearch} className=" w-full pb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH"
            className="bg-gray-950 h-auto w-full px-3 rounded-l-md focus:outline-none placeholder:font-bold"
            // minLength="3"
            required
          />
        </form>
      </>

      <div className="flex items-center justify-between border-t-2 border-red-500 rounded-t-xl pb-6 pt-2 ">
        {searchStructure?.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center font-bold text-[12px] lg:text-[16px] p-2 hover:cursor-pointer ${
              tabIndex === index + 1
                ? "text-red-500 border-b-[1px] border-red-500"
                : "text-white"
            } 
            `}
            onClick={() => nextTab(index + 1)}
          >
            {item?.label}
          </div>
        ))}
      </div>

      <ScrollPositionManager scrollKey={` ${searchTerm + tabIndex} `} />

      <div>
        {tabIndex === 1 && (
          <div className="py-10 flex flex-col gap-10">
            <CharacterSearch searchTerm={searchTerm} simplified />
            {/* ComicSearch */}

            <ComicSearch searchTerm={searchTerm} simplified />
            {/*  */}

            <EventSearch searchTerm={searchTerm} simplified />
            {/*  */}

            <SeriesSearch searchTerm={searchTerm} simplified />
          </div>
        )}
        {/*  */}
        {tabIndex === 2 && (
          <>
            <CharacterSearch searchTerm={searchTerm} />
          </>
        )}
        {/*  */}
        {tabIndex === 3 && (
          <>
            <ComicSearch searchTerm={searchTerm} />
          </>
        )}
        {/*  */}
        {tabIndex === 4 && (
          <>
            <EventSearch searchTerm={searchTerm} />
          </>
        )}
        {/*  */}
        {tabIndex === 5 && (
          <>
            <SeriesSearch searchTerm={searchTerm} />
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
