import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetComicSeriesQuery } from "../../services/searchApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";
import { BiSolidInfoCircle } from "react-icons/bi";

const ComicSeriesSearch = () => {
  const { searchTerm } = useParams();
  const [series, setSeries] = useState();
  const { data, isFetching } = useGetComicSeriesQuery(searchTerm);

  useEffect(() => {
    const seriesDetails = data?.data?.results;
    console.log(seriesDetails);
    setSeries(seriesDetails);
    document.title = "Series | Marvel-Verse";
  }, [data]);

  if (isFetching) return <Loader />;

  return (
    <div>
      <></>
    </div>
  );
};

export default ComicSeriesSearch;
