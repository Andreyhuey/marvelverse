import React, { useEffect, useState } from "react";
import { useGetCollectionComicsQuery } from "../../services/collectionApi";
import ScrollPositionManager from "../ScrollManager";
import { Link } from "react-router-dom";
import { BiSolidInfoCircle } from "react-icons/bi";
import Loader from "../Loader";
import { comicsOptions } from "../../data";
import { Autocomplete, TextField } from "@mui/material";
import ComicsComp from "../pageComp/ComicsComp";

const CollectionComics = (props) => {
  const searchTerm = props?.searchTerm;
  const [comics, setComics] = useState([]);
  const limit = "12";
  const [offset, setOffset] = useState(0);

  const { data: comicsList, isFetching } = useGetCollectionComicsQuery({
    searchTerm,
    limit,
    offset,
  });

  useEffect(() => {
    const fetchResults = comicsList?.data?.results;

    setComics(fetchResults || []);
    console.log(fetchResults);
  }, [comicsList]);

  if (isFetching) return <Loader />;

  return (
    <>
      {comics.length > 1 && (
        <>
          <h1 className="capitalize text-start font-bold pt-8 text-lg">
            Comics
          </h1>

          <ComicsComp searchTerm={searchTerm} comics={comics} />
        </>
      )}
    </>
  );
};

export default CollectionComics;
