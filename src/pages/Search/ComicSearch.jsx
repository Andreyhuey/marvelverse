import React, { useState, useEffect } from "react";
import { useGetSearchComicsQuery } from "../../services/searchApi";
import { ComicsComp, Loader } from "../../components";
import { comicsOptions } from "../../data";

const ComicSearch = ({ searchTerm, simplified }) => {
  const options = comicsOptions;
  const [orderBy, setOrderBy] = useState(options[5]?.value);
  const limit = simplified ? 20 : 100;
  const [offset, setOffset] = useState("");
  const [comics, setComics] = useState([]);

  const { data: comicsList, isFetching } = useGetSearchComicsQuery({
    searchTerm,
    orderBy,
    limit,
    offset,
  });

  // useEffect to fetch the comicsList and sort it
  useEffect(() => {
    const fetchResults = comicsList?.data?.results;
    setComics(fetchResults || []);
  }, [comicsList]);

  // Loading state
  if (isFetching) return <Loader />;

  return (
    <div>
      {comics?.length > 0 && (
        <div className="w-full">
          <span className="border-t-2 border-red-500 py-10" />
        </div>
      )}

      {comics?.length !== 0 && (
        <>
          <h1 className="capitalize text-start font-bold pt-8 text-lg py-3">
            Comics
          </h1>
        </>
      )}

      <ComicsComp comics={comics} searchTerm={searchTerm} />
    </div>
  );
};

export default ComicSearch;
