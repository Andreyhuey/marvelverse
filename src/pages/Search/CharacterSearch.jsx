import React, { useState, useEffect } from "react";
import { useGetSearchCharactersQuery } from "../../services/searchApi";
import { CharactersComp, Loader } from "../../components";
import { charactersOptions } from "../../data";

const CharacterSearch = () => {
  const options = charactersOptions;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState(options[0]?.value);
  const [characters, setCharacters] = useState([]);

  const [offset, setOffset] = useState(0);
  const limit = "100";

  const { data: charactersList, isFetching } = useGetSearchCharactersQuery({
    searchTerm,
    limit,
    offset,
    orderBy,
  });

  const handleSearch = (event) => {
    event.preventDefault();
    // Fetch data when the submit button is clicked
    // You can add any additional validation or error handling here
    setSearchTerm(searchQuery);
    setOffset(0); // Reset offset to fetch the first page of results
  };

  useEffect(() => {
    const fetchResults = charactersList?.data?.results;

    setCharacters(fetchResults || []);
    console.log(fetchResults);
  }, [charactersList]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div>
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
      </div>
      <CharactersComp characters={characters} searchTerm={searchTerm} />
    </>
  );
};

export default CharacterSearch;
