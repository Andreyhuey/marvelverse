import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import { Loader } from "../../components";
import { useGetEventsQuery } from "../../services/eventsApi";

const Events = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [total, setTotal] = useState(" ");
  const [label, setLabel] = useState("Ascending Order (A-Z)");
  const { data: eventsList, isFetching } = useGetEventsQuery({
    orderBy,
    limit,
    offset,
  });
  const [isHovered, setIsHovered] = useState(false);

  //   Pagination useState(s)
  const [currentEventPage, setCurrentEventPage] = useState(
    parseInt(sessionStorage.getItem("currentEventPage")) || 1
  );

  // handleChange for the Order
  const handleChange = (event, newValue) => {
    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
    setCurrentEventPage(1);
  };

  // Options for the Order
  const options = [
    { label: "Newest", value: "-startDate" },
    { label: "Oldest", value: "startDate" },
    { label: "Ascending Order (A-Z)", value: "name" },
    { label: "Descending Order (Z-A)", value: "-name" },
    { label: "Last Modified", value: "modified" },
  ];

  // UseEffect used to fetch and set Total, count and offset
  useEffect(() => {
    const fetchResults = eventsList?.data?.results;
    setEvents(fetchResults || []);
    setTotal(eventsList?.data?.total);
    setCount(eventsList?.data?.count);
    setOffset((currentEventPage - 1) * limit);
    console.log(fetchResults);
    sessionStorage.setItem("currentEventPage", currentEventPage);
    document.title = "Marvel Events";
  }, [eventsList, orderBy, limit, currentEventPage]);

  // Loading state for fetch
  if (isFetching) return <Loader />;

  // Total Pages of Data Available
  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentEventPage(number);
    sessionStorage.setItem(currentEventPage, number);
  };

  return (
    <>
      <section
        className="container-fluid"
        style={{ backgroundColor: "#00002e" }}
      >
        <div className="container vh-auto my-5 py-5">
          <h3 className="text-bold fw-bold text-center py-3">Marvel Events</h3>
          <div className="d-flex justify-content-between">
            <div className="">Total Events Found : {total}</div>
            <div className="text-center h6 fw-bold bg-black p-3 rounded">
              Page {currentEventPage} of {totalPages()}
            </div>
            <div className="text-center h6">Total Rendered : {count}</div>
          </div>

          <div className="  text-black">
            <fieldset className="fieldset gap-2">
              <label
                htmlFor="loe"
                className="text-white uppercase font-semibold font-mono"
              >
                Order By
              </label>
              <div className=" w-100 h-auto mt-1 rounded-lg">
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
                      className="  placeholder:text-slate-950 w-full"
                    />
                  )}
                />
              </div>
            </fieldset>
          </div>

          <div className="row">
            {events.map((c) => {
              return (
                <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                  <div className="border card my-3 bg-black">
                    <Link
                      key={c.id}
                      to={`/events/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-1 bg-image hover-overlay hover-zoom hover-shadow ripple">
                        <img
                          src={
                            c.thumbnail.path.loading
                              ? { isFetching }
                              : c.thumbnail.path + ".jpg"
                          }
                          className="card-img-top"
                          alt={"img of " + c.title}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="container d-flex justify-content-center overflow-auto pt-5">
              <nav aria-label="Page navigation example ">
                <ul className="pagination">
                  {Array.from({ length: totalPages() }, (_, i) => i + 1).map(
                    (number) => (
                      <li
                        key={number}
                        className={`page-item ${
                          currentEventPage === number ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(number)}
                        >
                          {number}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
