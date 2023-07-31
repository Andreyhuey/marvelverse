import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Loader } from "../../components";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [isLoading, setLoading] = useState(true);

  //   Pagination useState(s)
  const [currentEventPage, setCurrentEventPage] = useState(
    parseInt(sessionStorage.getItem("currentEventPage")) || 1
  );
  const limit = 20;

  useEffect(() => {
    async function fetchCreators(currentEventPage) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/events?limit=${limit}&offset=${
          (currentEventPage - 1) * limit
        }&orderBy=modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${
          process.env.REACT_APP_HASH
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setEvents(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchCreators(currentEventPage);
    sessionStorage.setItem("currentEventPage", currentEventPage);

    document.title = "Marvel Events";
  }, [currentEventPage, limit]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentEventPage(number);
    sessionStorage.setItem(currentEventPage, number);
  };

  // loading state component
  if (isLoading) return <Loader />;

  return (
    <>
      <section className="container-fluid bg-dark">
        <div className="container vh-auto">
          <h3 className="text-bold fw-bold text-center py-3">Marvel Events</h3>
          <div className="d-flex justify-content-between">
            <div className="">Total Events Found : {total}</div>
            <div className="text-center h6 fw-bold bg-black p-3">
              Page {currentEventPage} of {totalPages()}
            </div>
            <div className="text-center h6">Total Rendered : {count}</div>
          </div>

          <div className="row">
            {events.map((c) => {
              return (
                <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                  <div className="border border-light card my-3 bg-black">
                    <Link
                      key={c.id}
                      to={`/events/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-1">
                        <img
                          src={
                            c.thumbnail.path.loading
                              ? { isLoading }
                              : c.thumbnail.path + ".jpg"
                          }
                          className="card-img-top"
                          alt={"img of " + c.title}
                        />
                        <div className="d-flex justify-content-center">
                          <h4 className="card-body text-center text-light py-3">
                            {c.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="container d-flex overflow-auto pt-5">
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
