import React, { useState } from "react";
import CharacterSearch from "./CharacterSearch";
import ComicSearch from "./ComicSearch";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    // Fetch data when the submit button is clicked
    // You can add any additional validation or error handling here
    setSearchTerm(searchQuery);
    setOffset(0); // Reset offset to fetch the first page of results
  };

  return (
    <>
      <div>
        <>
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search term"
              className="text-black h-auto lg:w-[200px] px-3 rounded-l-md focus:outline-none"
              // minLength="3"
              required
            />
            <button type="submit" className=" bg-gray-800 rounded-r-md  px-3">
              Search
            </button>
          </form>
        </>
      </div>

      <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center gap-4 py-10 px-2 md:px-8 lg:px-20">
        {/* Characters */}
        <CharacterSearch searchTerm={searchTerm} />
      </div>

      <ComicSearch />
    </>
  );
};

export default Search;
