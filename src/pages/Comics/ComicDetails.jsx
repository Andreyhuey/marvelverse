import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetComicDetailsQuery } from "../../services/comicsApi";
import { Link } from "react-router-dom";
import { BiSolidInfoCircle } from "react-icons/bi";
import moment from "moment";
import Loader from "../../components/Loader";
import { DetailsTab } from "../../data";

const ComicDetails = () => {
  const { comicId, title } = useParams();
  const { data, isFetching } = useGetComicDetailsQuery(comicId);
  const [comic, setComic] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const nextTab = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const comicDetails = data?.data?.results;
    console.log(comicDetails);
    setComic(comicDetails);
    document.title = `${title} | Comics | Marvelverse`;
    document.body.scrollTop = 0;
  }, [data, title]);

  if (isFetching) return <Loader />;

  function getPartBeforeFirstParenthesis(inputString) {
    const index = inputString.indexOf("(");
    if (index !== -1) {
      return inputString.substring(0, index).trim();
    }
    // If "(" is not found, return the original string or handle it as needed
    return inputString;
  }

  // Example usage:
  function modifiedTitle(str) {
    getPartBeforeFirstParenthesis(str);
  }

  return (
    <>
      <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 min-h-screen text-white">
        <div>
          {comic &&
            comic?.map((comic, index) => {
              const {
                id,
                thumbnail,
                title,
                description,
                series,
                issueNumber,
                pageCount,
                format,
                prices,
                modified,
                characters,
                events,
                creators,
              } = comic;
              return (
                <div
                  key={index}
                  className="flex items-center lg:items-start justify-center flex-col lg:flex-row gap-x-5 gap-y-8"
                >
                  <div className="flex-1">
                    <img
                      src={thumbnail.path && thumbnail.path + ".jpg"}
                      className="card-img-top"
                      alt={"...image of " + title}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col justify-center items-start gap-10">
                      <h5 className="font-extrabold text-[30px] capitalize text-center">
                        {title}
                      </h5>

                      <div className="flex items-center justify-between w-full lg:w-full h-full font-bold">
                        {DetailsTab?.map((item, index) => (
                          <div
                            className={`py-3 px-8  text-white rounded-xl cursor-pointer z-10 ${
                              tabIndex === index ? "bg-black" : "bg-slate-800"
                            } `}
                            key={index}
                            onClick={() => nextTab(index)}
                          >
                            {item?.tab}
                          </div>
                        ))}
                      </div>

                      <div className="bg-black p-8 rounded-[20px] w-full min-h-fit">
                        {tabIndex === 0 && (
                          <div className="text-white">
                            {description ? (
                              <p>{HTMLReactParser(description)}</p>
                            ) : (
                              <div className=" flex gap-2 items-center italic">
                                <BiSolidInfoCircle className="text-red-500" />{" "}
                                No description provided by
                                <span className="text-red-500">MARVEL</span>
                              </div>
                            )}
                          </div>
                        )}

                        {tabIndex === 1 && (
                          <>
                            <div className="flex flex-col gap-6 justify-center w-full text-slate-300">
                              {issueNumber > 0 && (
                                <p className="font-semibold">
                                  Issue Number:
                                  <span className="text-white">
                                    {" "}
                                    {issueNumber}
                                  </span>
                                </p>
                              )}

                              <p className="font-semibold">
                                Page Count:
                                <span className="text-white"> {pageCount}</span>
                              </p>

                              <p className="font-semibold">
                                Format:
                                <span className="text-white"> {format}</span>
                              </p>

                              {prices[0].price > 0 && (
                                <p className="font-semibold">
                                  Price:
                                  <span className="text-white">
                                    {" "}
                                    ${prices[0].price}
                                  </span>
                                </p>
                              )}

                              <p className="font-semibold">
                                Date:{" "}
                                <span className="text-white">
                                  {moment(modified).format("MMM DD, YYYY")}
                                </span>
                              </p>
                            </div>
                          </>
                        )}

                        {tabIndex === 2 && (
                          <div className="flex flex-col gap-3 w-full">
                            <div className="flex justify-between w-full py-6 items-center ">
                              {characters.available !== 0 && (
                                <Link
                                  to={`/comics/${id}/${title.replace(
                                    /#/g,
                                    "Issue "
                                  )}/characters`}
                                >
                                  <button className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out text-center text-white flex gap-2 items-center justify-center px-6 py-2 font-bold rounded-xl cursor-pointer">
                                    <p className="font-mono text-white">
                                      {characters.available}
                                    </p>
                                    <p className="font-semibold text-[#c0bdbd]">
                                      {characters.available === 1 ? (
                                        <>Character</>
                                      ) : (
                                        characters.available > 1 && (
                                          <>Characters</>
                                        )
                                      )}
                                    </p>
                                  </button>
                                </Link>
                              )}

                              {events.available !== 0 && (
                                <Link
                                  to={`/comics/${id}/${title.replace(
                                    /#/g,
                                    "Issue "
                                  )}/events`}
                                >
                                  <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out text-center text-white flex gap-2 items-center justify-center px-6 py-2 font-bold rounded-xl cursor-pointer">
                                    <p className="font-mono text-[#c0bdbd]">
                                      {events.available}
                                    </p>
                                    <p className="font-semibold">
                                      {events.available === 1 ? (
                                        <>Event</>
                                      ) : (
                                        events.available > 1 && <>Events</>
                                      )}
                                    </p>
                                  </div>
                                </Link>
                              )}
                            </div>

                            {series.available !== 0 && (
                              <div className="text-center text-slate-300  flex flex-col gap-1 items-start justify-center font-bold rounded-xl">
                                <p className="text-md">Series</p>
                                <Link
                                  to={`/series/${getPartBeforeFirstParenthesis(
                                    series?.name
                                  )}`}
                                >
                                  <p className="font-mono  text-white text-center">
                                    {series.name}
                                  </p>
                                </Link>
                              </div>
                            )}
                          </div>
                        )}

                        {tabIndex === 3 && (
                          <>
                            <div className="flex flex-col w-full justify-between gap-3">
                              {creators.items.map((c, index) => {
                                return (
                                  <div key={index}>
                                    <div>
                                      <div className="flex items-center justify-start gap-2">
                                        <p className="capitalize text-slate-300">
                                          {c.role}:{" "}
                                          <span className="text-white">
                                            {c.name}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ComicDetails;
