import React, { useState } from "react";
import CharacterSearch from "./CharacterSearch";
import ComicSearch from "./ComicSearch";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    setSearchTerm(searchQuery);
  };

  return (
    <div className="bg-gray-950 text-white flex flex-col min-h-screen items-center justify-center py-10 px-4 md:px-8 lg:px-20">
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

      {/* Characters */}
      <CharacterSearch searchTerm={searchTerm} />

      <ComicSearch searchTerm={searchTerm} />
    </div>
  );
};

export default Search;
