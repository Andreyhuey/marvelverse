import React, { useState, useEffect } from "react";
import { useGetSearchCharactersQuery } from "../../services/searchApi";
import { Loader } from "../../components";
import { charactersOptions } from "../../data";

const Search = () => {
  const options = charactersOptions;
  const [searchTerm, setSearchTerm] = useState("iron");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState(options[0]?.value);
  const [characters, setCharacters] = useState([]);

  const [offset, setOffset] = useState(0);
  const limit = "30";

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
    <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center gap-4">
      <div>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search term"
            className="text-black"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <h1 className="font-bold text-[42px] ">In Progress</h1>
    </div>
  );
};

export default Search;
