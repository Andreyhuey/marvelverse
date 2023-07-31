import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import "../../components/styles.css";
import { Loader } from "../../components";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [isLoading, setLoading] = useState(true);

  // Pagination useState(s)
  const [currentComicPage, setCurrentComicPage] = useState(
    parseInt(sessionStorage.getItem("currentComicPage")) || 1
  );
  const limit = 20;

  const handlePageClick = (number) => {
    setCurrentComicPage(number);
    sessionStorage.setItem(currentComicPage, number);
  };

  useEffect(() => {
    async function fetchComics(currentComicPage) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/comics?&limit=${limit}&offset=${
          (currentComicPage - 1) * limit
        }&orderBy=-onsaleDate&ts=1&apikey=${
          process.env.REACT_APP_API_KEY
        }&hash=${process.env.REACT_APP_HASH}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setComics(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchComics(currentComicPage);
    sessionStorage.setItem("currentComicPage", currentComicPage);

    // Set custom title for page
    document.title = "Marvel Comics";

    // Update URL to reflect custom title
  }, [currentComicPage, limit]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  // loading state component
  if (isLoading) return <Loader />;

  return (
    <section className="container-fluid bg-dark">
      <div>{isLoading}</div>
      <div className="container vh-auto">
        <h3 className="text-bold fw-bold text-center py-3">Marvel comics</h3>
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total comics Found : {total}</div>
          <div className="text-center h6 fw-bold bg-black p-3">
            Page {currentComicPage} of {totalPages()}
          </div>
          <div className="text-center h6">Total comics Rendered : {count}</div>
        </div>
        <div className="row">
          {comics.map((c) => {
            return (
              <div key={c.id} className="col-lg-4 col-md-6">
                <div className="border border-primary card my-3 bg-black">
                  <Link
                    key={c.id}
                    to={`/comics/${c.id}`}
                    style={{ textDecoration: "none" }}
                    className="text-primary hover-effect"
                  >
                    <div className="p-2 my-3">
                      <h4 className="card-header text-center py-3">
                        {c.title}
                      </h4>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className="card-img-top"
                        alt="...img"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className="container d-flex overflow-auto pt-5">
            <nav aria-label="Page navigation example ">
              <ul className="pagination ">
                {Array.from(
                  { length: Math.ceil(total / limit) },
                  (_, i) => i + 1
                ).map((number) => (
                  <li
                    key={number}
                    className={`page-item ${
                      currentComicPage === number ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageClick(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comics;
