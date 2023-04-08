import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "html-react-parser";

const CharacterComics = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentComicPage, setCurrentComicPage] = useState(
    parseInt(sessionStorage.getItem("currentComicPage")) || 1
  );
  const [pageNo, setPageNo] = useState(currentComicPage);
  const [perPage, setPerPage] = useState(12);

  const handlePageClick = (number) => {
    setCurrentComicPage(number);
    setPageNo(number);
    sessionStorage.setItem("currentComicPage", number);
  };

  useEffect(() => {
    async function fetchData(pageNumber) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?&limit=${perPage}&offset=${
          (pageNumber - 1) * perPage
        }&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${
          process.env.REACT_APP_HASH
        }`
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

    fetchData(currentComicPage);
    sessionStorage.setItem("currentComicPage", currentComicPage);

    document.title = "Marvel Comics";
  }, [characterId, currentComicPage, perPage]);

  function totalPages() {
    let Pages = total / perPage;
    Pages = Math.ceil(Pages);
    return Pages;
  }

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
            Page {pageNo} of {totalPages()}
          </div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>
        <div>
          <div className="row">
            {comics.map((c) => {
              return (
                <div key={c.id} className="col-lg-4 col-md-6">
                  <div className="border border-primary card my-3 bg-primary">
                    <Link
                      key={c.id}
                      to={`/comics/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-3">
                        <h4 className="card-header text-center text-white py-3">
                          {c.title}
                        </h4>
                        <img
                          src={
                            c.thumbnail.path
                              ? c.thumbnail.path + ".jpg"
                              : loading
                          }
                          className="card-img-top"
                          alt="...img"
                        />
                        <div>{loading}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="d-flex ">
              <div className="justify-content-center overflow-auto pt-5">
                <nav aria-label="Page navigation example ">
                  <ul className="pagination ">
                    {Array.from(
                      { length: Math.ceil(total / perPage) },
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
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterComics;
