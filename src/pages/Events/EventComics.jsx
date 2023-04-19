import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import "../../components/styles.css";

export default function EventComics() {
  const { eventId } = useParams();
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [isLoading, setLoading] = useState(true);

  // Pagination useState(s)
  const [currentEventComicPage, setCurrentEventComicPage] = useState(
    parseInt(sessionStorage.getItem("currentEventComicPage")) || 1
  );
  const limit = 20;

  const handlePageClick = (number) => {
    setCurrentEventComicPage(number);
    sessionStorage.setItem(currentEventComicPage, number);
  };

  useEffect(() => {
    async function fetchComics(currentEventComicPage) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/events/${eventId}/comics?&limit=${limit}&offset=${
          (currentEventComicPage - 1) * limit
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

    fetchComics(currentEventComicPage);
    sessionStorage.setItem("currentEventComicPage", currentEventComicPage);

    // Set custom title for page
    document.title = "Marvel Event Comics";

    // Update URL to reflect custom title
  }, [currentEventComicPage, limit, eventId]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

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
    <section className="container-fluid bg-dark">
      <div>{isLoading}</div>
      <div className="container vh-auto">
        <h3 className="text-bold fw-bold text-center py-3">
          Marvel Event Comics
        </h3>
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total comics Found : {total}</div>
          <div className="text-center h6 fw-bold bg-black p-3">
            Page {currentEventComicPage} of {totalPages()}
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
                      currentEventComicPage === number ? "active" : ""
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
}
