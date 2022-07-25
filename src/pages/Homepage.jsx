import React from "react";

import { useGetCharactersQuery } from "../services/CharacterApi";

const Homepage = () => {
  const { data, isFetching } = useGetCharactersQuery();
  const totalStats = data?.data?.total;
  const totalCharacters = data?.data?.results;

  console.log(totalCharacters);
  console.log(totalStats);
  // const totalResults = data?.data?.results;

  if (isFetching) return "...loading";

  return <div>Total of Us : {totalStats}</div>;
};

export default Homepage;
