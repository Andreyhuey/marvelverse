import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetComicDetailsQuery } from "../../services/comicsApi";
import { Link } from "react-router-dom";
import { BiSolidInfoCircle } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import moment from "moment";
import Loader from "../../components/Loader";
import { DetailsTab } from "../../data";
import ScrollPositionManager from "../../components/ScrollManager";

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

  function removeParentheses(str) {
    return str.replace(/\([^)]*\)/g, "").trim();
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
                  className="flex items-center lg:items-start justify-center flex-col lg:flex-row gap-x-5 gap-y-8 w-full h-full overflow-hidden min-w-fit"
                >
                  <ScrollPositionManager scrollKey={` ${title + id} `} />
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src={thumbnail.path && thumbnail.path + ".jpg"}
                      className="md:max-h-[80vh]"
                      alt={"...image of " + title}
                    />
                  </div>

                  <div className="flex-1 h-full w-full">
                    <div className="flex flex-col justify-center h-full w-full items-center gap-8">
                      <h5 className="font-extrabold text-[30px] capitalize text-center">
                        {title}
                      </h5>

                      <div className="flex items-center justify-between gap-x-2 md:gap-x-4 md:w-full lg:justify-start  h-full font-bold">
                        {DetailsTab?.map((item, index) => (
                          <div
                            className={`p-3  text-white rounded-xl text-center cursor-pointer w-full z-10 ${
                              tabIndex === index ? "bg-black" : "bg-slate-800"
                            } `}
                            key={index}
                            onClick={() => nextTab(index)}
                          >
                            {item?.tab}
                          </div>
                        ))}
                      </div>

                      <div className="bg-black p-8 rounded-[20px] w-full min-h-[45vh]">
                        {tabIndex === 0 && (
                          <div className="text-white">
                            {description ? (
                              <p>{HTMLReactParser(description)}</p>
                            ) : (
                              <div className=" flex gap-1 items-center italic">
                                <BiSolidInfoCircle className="text-red-500 text-xl" />{" "}
                                <div>
                                  Sorry, No description provided by
                                  <span className="text-red-500 pl-1">
                                    MARVEL
                                  </span>
                                </div>
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

                              <p className="font-semibold">
                                Format:
                                <span className="text-white"> {format}</span>
                              </p>
                            </div>
                          </>
                        )}

                        {tabIndex === 2 && (
                          <div className="flex flex-col gap-5 h-full w-full">
                            {series.available !== 0 && (
                              <Link
                                to={`/series/${getPartBeforeFirstParenthesis(
                                  series?.name
                                )}`}
                                className="text-center text-slate-300  flex justify-start gap-3 item font-bold rounded-xl cursor-pointer bg-slate-900 px-6 py-2 w-fit hover:scale-110 transition duration-300 ease-in-out"
                              >
                                <p className="text-md">Series:</p>
                                <p className="font-mono  text-white text-center">
                                  {series.name}
                                </p>
                              </Link>
                            )}
                            <div className="flex justify-between w-full gap-3 items-center ">
                              {characters.available !== 0 && (
                                <>
                                  <div className="bg-slate-900 text-center text-white flex flex-col gap-5 items-start justify-center p-5 font-bold rounded-xl ">
                                    <div className="flex justify-between w-full gap-3 items-center">
                                      <p>
                                        {characters.available === 1 ? (
                                          <>Character</>
                                        ) : (
                                          characters.available > 1 && (
                                            <>Characters</>
                                          )
                                        )}
                                      </p>
                                      <Link
                                        className="hover:scale-125 transition duration-300 ease-in-out cursor-pointer"
                                        to={`/comics/${id}/${title.replace(
                                          /#/g,
                                          "Issue "
                                        )}/characters`}
                                      >
                                        <FiExternalLink />
                                      </Link>
                                    </div>
                                    <div
                                      className={` ${
                                        characters?.available >= 3
                                          ? "grid grid-cols-2"
                                          : "flex"
                                      } items-center justify-between gap-5 w-full`}
                                    >
                                      {characters.items.map((item, index) => (
                                        <Link
                                          key={index}
                                          to={`/collection/${removeParentheses(
                                            item.name
                                          )}`}
                                        >
                                          <div className="bg-slate-500 rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out py-1 px-3 font-normal">
                                            {item?.name}
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </>
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
                          </div>
                        )}

                        {tabIndex === 3 && (
                          <>
                            <div
                              className={` ${
                                creators.items.length > 8
                                  ? "grid grid-cols-2 "
                                  : "flex flex-col justify-between"
                              }  gap-3 w-full`}
                            >
                              {creators.items.map((c, index) => {
                                return (
                                  <div
                                    className="flex items-center justify-between gap-2"
                                    key={index}
                                  >
                                    <p className="capitalize text-slate-300 font-bold">
                                      {c.role}:{" "}
                                      <span className="text-white">
                                        {c.name}
                                      </span>
                                    </p>
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
