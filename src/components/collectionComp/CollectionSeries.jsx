import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCollectionSeriesQuery } from "../../services/collectionApi";
import { BiSolidInfoCircle } from "react-icons/bi";
import { Loader, SeriesComp } from "../../components";
import ScrollPositionManager from "../../components/ScrollManager";

function CollectionSeries(props) {
  const searchTerm = props?.searchTerm;
  const [series, setSeries] = useState([]);
  const limit = "12";
  const [offset, setOffset] = useState(0);

  const { data: seriesList, isFetching } = useGetCollectionSeriesQuery({
    searchTerm,
    limit,
    offset,
  });

  useEffect(() => {
    const fetchResults = seriesList?.data?.results;

    setSeries(fetchResults || []);
    console.log(fetchResults);
  }, [seriesList]);

  if (isFetching) return <Loader />;

  return (
    <>
      {series.length >= 1 && (
        <>
          <h1 className="capitalize text-start font-bold pt-8 text-lg">
            Series
          </h1>
        </>
      )}

      <SeriesComp search searchTerm={searchTerm} series={series} />
    </>
  );
}

export default CollectionSeries;
