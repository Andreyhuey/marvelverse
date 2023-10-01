import React, { useState, useEffect } from "react";
import { useGetSearchCharactersQuery } from "../../services/searchApi";
import { CharactersComp, Loader } from "../../components";
import { charactersOptions } from "../../data";

const CharacterSearch = ({ searchTerm, expandable }) => {
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
      <div></div>
      <CharactersComp characters={characters} searchTerm={searchTerm} />
    </>
  );
};

export default CharacterSearch;
