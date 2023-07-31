import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Loader } from "../../components";

const ComicCharacters = () => {
  const { comicId } = useParams();
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [isLoading, setLoading] = useState();

  // Pagination useState(s)
  const [currentComicCharacterPage, setCurrentComicCharacterPage] = useState(
    parseInt(sessionStorage.getItem("currentComicCharacterPage")) || 1
  );
  const limit = 20;

  useEffect(() => {
    async function fetchData(currentComicCharacterPage) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/comics/${comicId}/characters?&limit=${limit}&offset=${
          (currentComicCharacterPage - 1) * limit
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
          setCharacters(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchData(currentComicCharacterPage);
    sessionStorage.setItem(
      "currentComicCharacterPage",
      currentComicCharacterPage
    );
  }, [comicId, limit, currentComicCharacterPage]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentComicCharacterPage(number);
    sessionStorage.setItem(currentComicCharacterPage, number);
  };

  // loading state component
  if (isLoading) return <Loader />;

  return (
    <section className="container-fluid bg-dark">
      <div className="container vh-auto">
        <h3 className="text-bold fw-bold text-center py-3">
          Marvel Characters
        </h3>
        <div>{isLoading}</div>

        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6 fw-bold bg-black p-3">
            Page {currentComicCharacterPage} of {totalPages()}
          </div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>

        <div className="row">
          {characters.map((c) => {
            return (
              <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <div className="border border-warning card my-3 bg-dark">
                  <Link
                    key={c.id}
                    to={`/characters/${c.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="p-2 my-3">
                      <h4 className="card-header text-center text-warning py-3">
                        {c.name}
                      </h4>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className="card-img-top"
                        alt={"...img of" + c.name}
                      />
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
                        currentComicCharacterPage === number ? "active" : ""
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
  );
};

export default ComicCharacters;
