import React from "react";
import CharacterSearch from "./CharacterSearch";
import ComicSearch from "./ComicSearch";

const Search = () => {
  return (
    <>
      <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center gap-4 py-10 px-2 md:px-8 lg:px-20">
        {/* Characters */}
        <CharacterSearch />
      </div>

      <ComicSearch />
    </>
  );
};

export default Search;
