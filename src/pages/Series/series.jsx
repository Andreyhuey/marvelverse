import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [isLoading, setLoading] = useState(true);

  //   Pagination useState(s)
  const [currentSeriesPage, setCurrentSeriesPage] = useState(
    parseInt(sessionStorage.getItem("currentSeriesPage")) || 1
  );
  const limit = 20;

  useEffect(() => {
    async function fetchCreators(currentSeriesPage) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/series?limit=${limit}&offset=${
          (currentSeriesPage - 1) * limit
        }&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${
          process.env.REACT_APP_HASH
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setSeries(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchCreators(currentSeriesPage);
    sessionStorage.setItem("currentSeriesPage", currentSeriesPage);

    document.title = "Marvel Series";
  }, [currentSeriesPage, limit]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentSeriesPage(number);
    sessionStorage.setItem(currentSeriesPage, number);
  };

  // loading state component
  if (isLoading)
    return (
      <div
        className="display-1 d-flex align-items-center justify-content-center"
        style={{ height: "100vh", backgroundColor: "#000000" }}
      >
        <BeatLoader
          color="#ffff"
          size={13}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
    <>
      <section className="container-fluid bg-dark">
        <div className="container vh-auto">
          <h3 className="text-bold fw-bold text-center py-3">Marvel Series</h3>
          <div className="d-flex justify-content-between">
            <div className="">Total Series Found : {total}</div>
            <div className="text-center h6 fw-bold bg-black p-3">
              Page {currentSeriesPage} of {totalPages()}
            </div>
            <div className="text-center h6">Total Rendered : {count}</div>
          </div>

          <div className="row">
            {series.map((c) => {
              return (
                <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                  <div className="border border-info card my-3 bg-black">
                    <Link
                      key={c.id}
                      to={`/series/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-1">
                        <img
                          src={c.thumbnail.path + ".jpg"}
                          className="card-img-top"
                          alt={"img of " + c.title}
                        />
                        <div className="d-flex justify-content-center">
                          <h4 className="card-body text-center text-info py-3">
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
                          currentSeriesPage === number ? "active" : ""
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

export default Series;
