import React, { useState, useEffect } from "react";
import { useGetSearchCharactersQuery } from "../../services/searchApi";
import { Loader } from "../../components";
import { charactersOptions } from "../../data";

const Search = () => {
  const options = charactersOptions;
  const [searchTerm, setSearchTerm] = useState("iron");
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

  useEffect(() => {
    const fetchResults = charactersList?.data?.results;

    setCharacters(fetchResults || []);
    console.log(fetchResults);
  }, [charactersList]);

  if (isFetching) return <Loader />;

  return (
    <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
      <h1 className="font-bold text-[42px] ">In Progress</h1>
    </div>
  );
};

export default Search;
