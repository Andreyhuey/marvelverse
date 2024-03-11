import React, { useState, useEffect } from "react";
import { useGetSearchCharactersQuery } from "../../services/searchApi";
import { CharactersComp, Loader } from "../../components";
import { charactersOptions } from "../../data";

const CharacterSearch = ({ searchTerm, simplified }) => {
  const options = charactersOptions;
  const [orderBy, setOrderBy] = useState(options[0]?.value);
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = simplified ? 20 : 100;

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
    <div className="pt-5">
      <>
        {characters.length !== 0 && (
          <>
            {" "}
            <h1 className="capitalize text-start font-bold pt-8 text-lg">
              Characters
            </h1>
          </>
        )}
        <CharactersComp characters={characters} searchTerm={searchTerm} />
      </>
    </div>
  );
};

export default CharacterSearch;
