import React, { useState, useEffect } from "react";
import { useGetSearchCharactersQuery } from "../../services/searchApi";
import { CharactersComp, Loader } from "../../components";
import { charactersOptions } from "../../data";

const CharacterSearch = ({ searchTerm, expandable }) => {
  const options = charactersOptions;
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
