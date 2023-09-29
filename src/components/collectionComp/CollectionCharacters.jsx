import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import { useGetCollectionCharactersQuery } from "../../services/collectionApi";
import CharactersComp from "../pageComp/CharactersComp";

const CollectionCharacters = (props) => {
  const searchTerm = props?.searchTerm;
  const [characters, setCharacters] = useState([]);
  const limit = "30";
  const [offset, setOffset] = useState(0);

  const { data: charactersList, isFetching } = useGetCollectionCharactersQuery({
    searchTerm,
    limit,
    offset,
  });

  useEffect(() => {
    const fetchResults = charactersList?.data?.results;

    setCharacters(fetchResults || []);
    console.log(fetchResults);
  }, [charactersList]);

  if (isFetching) return <Loader />;
  return (
    <>
      {characters.length >= 1 && (
        <>
          <h1 className="capitalize text-start font-bold pt-8 text-lg">
            Characters
          </h1>
          <CharactersComp characters={characters} searchTerm={searchTerm} />
        </>
      )}
    </>
  );
};

export default CollectionCharacters;
