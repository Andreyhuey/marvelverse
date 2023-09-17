import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetSeriesCharactersQuery } from "../../services/seriesApi";
import Loader from "../../components/Loader";
import { BiSolidInfoCircle } from "react-icons/bi";
import { Autocomplete, TextField } from "@mui/material";
import ScrollPositionManager from "../../components/ScrollManager";

const SeriesCharacters = () => {
  return (
    <div>
      <></>
    </div>
  );
};

export default SeriesCharacters;
