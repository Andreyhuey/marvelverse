import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useGetEventCharactersQuery } from "../services/eventsApi";
import Loader from "./Loader";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const DataCharacters = () => {
  const { eventId } = useParams();
  const [orderBy, setOrderBy] = useState("name");
  const [label, setLabel] = useState("Ascending Order (A-Z)");
  const limit = "100";
  const { data: charactersList, isFetching } = useGetEventCharactersQuery({
    eventId,
    orderBy,
    limit,
  });

  const [characters, setCharacters] = useState([]);

  const [hoveredId, setHoveredId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    setIsHovered(true);
  };

  const Blur = () => {
    if (isHovered === true) return "backdrop-blur-xl blur-3xl rounded-xl";
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setIsHovered(false);
  };

  const handleChange = (event, newValue) => {
    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
  };

  useEffect(() => {
    const fetchResults = charactersList?.data?.results;
    setCharacters(fetchResults || []);
    console.log(fetchResults);
  }, [charactersList, orderBy]);

  const options = [
    { label: "Ascending Order (A-Z)", value: "name" },
    { label: "Descending Order (Z-A)", value: "-name" },
    { label: "Oldest", value: "modified" },
    { label: "Recently Modified", value: "-modified" },
  ];

  if (isFetching) return <Loader />;

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        <h4 className="text-center">Event Characters</h4>

        <div className="flex items-end justify-end text-black mb-7">
          <fieldset className="fieldset flex items-center justify-center gap-2">
            <label
              htmlFor="loe"
              className="text-white uppercase font-semibold font-mono"
            >
              Order By
            </label>
            <div className=" w-[225px] h-auto mt-1 rounded-lg">
              <Autocomplete
                disablePortal
                id="grading-system"
                options={options}
                // getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                className="uppercase rounded-lg focus:outline-none bg-slate-400"
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="Order By"
                    placeholder={label}
                    required
                    className="flex items-center justify-center placeholder:text-slate-950"
                  />
                )}
              />
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
          {characters?.map((c) => (
            <div key={c.id} className="">
              <div className="hover:p-1  font-mono relative group cursor-pointer">
                {/* <Link key={c.id} to={`/events/${c.id}`} className="py-4"> */}
                <div
                  className={` ${
                    c.id === hoveredId
                      ? "py-2 font-mono rounded-xl bg-gray-900 "
                      : "py-2 font-mono"
                  } `}
                  onMouseEnter={() => handleMouseEnter(c.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {c.id === hoveredId ? (
                    <>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className={`${Blur}`}
                        alt={"img of " + c.title}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className={`${"rounded-xl"}`}
                        alt={"img of " + c.title}
                      />
                    </>
                  )}

                  {c.description ? (
                    <div className="tooltip  text-white px-3 pb-3 pt-7 text-md opacity-0 group-hover:opacity-100 absolute bottom-0 top-0 left-1/2 mb-2 transform -translate-x-1/2 pointer-events-none transition-opacity rounded-xl flex flex-col items-start justify-start w-full h-full">
                      <p className="line-clamp-[9] font-serif">
                        {HTMLReactParser(c.description)}
                      </p>
                    </div>
                  ) : (
                    <div className="tooltip p-2 text-md rounded opacity-0 group-hover:opacity-100 absolute  top-0  left-1/2 transform -translate-x-1/2 pointer-events-none transition-opacity  w-full h-full  flex flex-col items-center justify-center gap-5">
                      <p className="font-extrabold text-xl text-center">
                        No description provided.
                      </p>
                    </div>
                  )}
                  <div className="px-2 pb-2">
                    <div className={`uppercase  font-bold py-2  "`}>
                      {c.name}
                    </div>
                    {/* <div className={`font-mono font-bold text-[#a7a4a4]`}>
                      {c.modified ? moment(c.modified).format("YYYY") : "Nill"}
                    </div> */}
                  </div>
                </div>

                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataCharacters;
