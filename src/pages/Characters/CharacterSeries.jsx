import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import { Link } from "react-router-dom";

const CharacterSeries = () => {
  const { characterId } = useParams();
  const [series, setSeries] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);

  //   Pagination useState(s)
  const [currentCharacterSeriesPage, setCurrentCharacterSeriesPage] = useState(
    parseInt(sessionStorage.getItem("currentCharacterSeriesPage")) || 1
  );
  const limit = 12;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/series?limit=${limit}&orderBy=-modified&
        offset=${(currentCharacterSeriesPage - 1) * limit}&ts=1&apikey=${
          process.env.REACT_APP_API_KEY
        }&hash=${process.env.REACT_APP_HASH}`
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

    fetchData(currentCharacterSeriesPage);
    sessionStorage.setItem(
      "currentCharacterSeriesPage",
      currentCharacterSeriesPage
    );
  }, [characterId, limit, currentCharacterSeriesPage]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentCharacterSeriesPage(number);
    sessionStorage.setItem(currentCharacterSeriesPage, number);
  };

  if (loading)
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
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6 fw-bold bg-black p-3">
            Page {currentCharacterSeriesPage} of {totalPages()}
          </div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>
        <div>
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
                          currentCharacterSeriesPage === number ? "active" : ""
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
      </div>
    </div>
  );
};

export default CharacterSeries;
