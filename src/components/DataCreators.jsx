import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useGetEventCreatorsQuery } from "../services/eventsApi";
import Loader from "./Loader";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const DataCreators = () => {
  const { eventId } = useParams();
  const [orderBy, setOrderBy] = useState("firstName");
  const [label, setLabel] = useState("First Name Ascending Order (A-Z)");
  const limit = "100";
  const { data: creatorsList, isFetching } = useGetEventCreatorsQuery({
    eventId,
    orderBy,
    limit,
  });

  const [creators, setCreators] = useState([]);
  const [total, setTotal] = useState(0);

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
    const fetchResults = creatorsList?.data?.results;
    setTotal(creatorsList?.data?.total);
    setCreators(fetchResults || []);
    console.log(fetchResults);
  }, [creatorsList, orderBy]);

  const options = [
    { label: "First Name Ascending Order (A-Z)", value: "firstName" },
    { label: "First Name Descending Order (Z-A)", value: "-firstName" },
    { label: "Last Name Ascending Order (A-Z)", value: "lastName" },
    { label: "Last Name Descending Order (Z-A)", value: "-lastName" },
    { label: "Oldest Modified", value: "modified" },
    { label: "Recently Modified", value: "-modified" },
  ];

  if (isFetching) return <Loader />;
  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        <h4 className="text-center"> Event Creators</h4>

        <div className="flex flex-col md:flex-row items-center justify-between text-black mb-7 gap-4">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-center">
            <h4>Available Creators :</h4>
            <div>{total}</div>
          </div>
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8">
          {creators?.map((c) => (
            <div key={c.id} className="">
              <div className="hover:p-1 font-mono relative group cursor-pointer">
                <div>
                  <>
                    <img
                      src={c.thumbnail.path + ".jpg"}
                      className={`${"rounded-xl"}`}
                      alt={"img of " + c.title}
                    />
                  </>
                </div>
              </div>
              <div className="px-2 pb-2">
                <div className={`uppercase  font-bold py-2  "`}>
                  {c.fullName}
                </div>
                <div className={`font-mono font-bold text-[#a7a4a4]`}>
                  {c.modified ? moment(c.modified).format("YYYY") : "Nill"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataCreators;
