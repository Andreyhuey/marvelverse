import React, { useState, useEffect } from "react";
import { useGetSearchSeriesQuery } from "../../services/searchApi";
import { SeriesComp, Loader } from "../../components";
import { seriesOptions } from "../../data";

const SeriesSearch = ({ searchTerm, simplified }) => {
  const options = seriesOptions;
  const [orderBy, setOrderBy] = useState(options[4]?.value);
  const [series, setSeries] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = simplified ? 20 : 100;

  const { data: seriesList, isFetching } = useGetSearchSeriesQuery({
    searchTerm,
    limit,
    offset,
    orderBy,
  });

  useEffect(() => {
    const fetchResults = seriesList?.data?.results;

    setSeries(fetchResults || []);
    console.log(fetchResults);
  }, [seriesList]);

  if (isFetching) return <Loader />;

  return (
    <div>
      {series.length !== 0 && (
        <>
          <h1 className="capitalize text-start font-bold pt-8 text-lg text-[40px]">
            Series
          </h1>
        </>
      )}
      <SeriesComp series={series} searchTerm={searchTerm} />
    </div>
  );
};

export default SeriesSearch;
