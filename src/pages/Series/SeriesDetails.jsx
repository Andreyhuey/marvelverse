import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetSeriesDetailsQuery } from "../../services/seriesApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";
import { BiSolidInfoCircle } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { DetailsTab } from "../../data";

const SeriesDetails = () => {
  const { seriesId, title } = useParams();
  const { data, isFetching } = useGetSeriesDetailsQuery(seriesId);
  const [comic, setComic] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const nextTab = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const comicDetails = data?.data?.results;
    console.log(comicDetails);
    setComic(comicDetails);
    document.title = `${title} | Series | Marvelverse`;
    document.body.scrollTop = 0;
  }, [data, title]);

  if (isFetching) return <Loader />;

  function removeParentheses(str) {
    return str.replace(/\([^)]*\)/g, "").trim();
  }

  return (
    <>
      <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 min-h-screen w-full text-white">
        <div>
          {comic &&
            comic.map((d) => {
              return (
                <div
                  key={d.id}
                  className="flex flex-col lg:flex-row items-center h-full w-full justify-center lg:items-start gap-x-5 gap-y-8"
                >
                  <div className="flex-1 flex h-full w-full items-center justify-center">
                    <img
                      src={d.thumbnail.path && d.thumbnail.path + ".jpg"}
                      className="h-auto w-auto"
                      alt={"...image of " + d.title}
                    />
                  </div>

                  <div className="flex-1 flex flex-col h-full w-full justify-center items-center gap-8">
                    <h5 className="font-extrabold text-[30px] capitalize text-center">
                      {d.title}
                    </h5>

                    <div className="flex items-center justify-between gap-x-2 lg:justify-start md:gap-x-4 w-fit md:w-full h-full">
                      {DetailsTab?.map((item, index) => (
                        <div
                          className={`p-3 lg:px-8  text-white rounded-xl cursor-pointer w-full z-10  text-center ${
                            tabIndex === index ? "bg-black" : "bg-slate-800"
                          } `}
                          key={index}
                          onClick={() => nextTab(index)}
                        >
                          {item?.tab}
                        </div>
                      ))}
                    </div>

                    <div className="bg-black p-8 rounded-[20px] w-full  min-h-[50vh]">
                      {tabIndex === 0 && (
                        <div className="text-white">
                          {d?.description ? (
                            <p>{HTMLReactParser(d?.description)}</p>
                          ) : (
                            <div className=" flex gap-2 items-center italic">
                              <BiSolidInfoCircle className="text-red-500 text-xl" />{" "}
                              Sorry, No description provided by
                              <span className="text-red-500">MARVEL</span>
                            </div>
                          )}
                        </div>
                      )}

                      {tabIndex === 1 && (
                        <>
                          <div className="flex flex-col gap-6 justify-center w-full text-slate-300 ">
                            {d.type && (
                              <p className="font-semibold">
                                Type:
                                <span className="text-white"> {d.type}</span>
                              </p>
                            )}

                            {d.rating && (
                              <p className="font-semibold">
                                Rating:
                                <span className="text-white"> {d.rating}</span>
                              </p>
                            )}

                            <p className="font-semibold">
                              Start Year:{" "}
                              <span className="text-white">{d.startYear}</span>
                            </p>

                            <p className="font-semibold">
                              End Year:{" "}
                              <span className="text-white">{d.endYear}</span>
                            </p>

                            <p className="font-semibold w-full">
                              Modified:{" "}
                              <span className="text-white">
                                {moment(d.modified).format("MMM DD, YYYY")}
                              </span>
                            </p>
                          </div>
                        </>
                      )}

                      {tabIndex === 2 && (
                        <div className="flex flex-col gap-5 h-full w-full">
                          {d?.comics.available !== 0 && (
                            <Link
                              to={`/series/${d?.id}/${d?.title.replace(
                                /#/g,
                                "Issue "
                              )}/comics`}
                            >
                              <button className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out text-center text-white flex gap-2 items-center justify-center px-6 py-2 font-bold rounded-xl cursor-pointer">
                                <p className="font-mono text-white">
                                  {d?.comics.available}
                                </p>
                                <p className="font-semibold text-[#c0bdbd]">
                                  {d?.comics.available === 1 ? (
                                    <>Comic Released</>
                                  ) : (
                                    d?.comics.available > 1 && (
                                      <>Comics Released</>
                                    )
                                  )}
                                </p>
                                <FiExternalLink />
                              </button>
                            </Link>
                          )}

                          {d?.characters.available !== 0 && (
                            <div className="bg-slate-900   text-white flex flex-col gap-5 items-start justify-center p-5 font-bold rounded-xl">
                              <div className="flex justify-between w-full gap-3 items-center">
                                <p>
                                  {d?.characters.available === 1 ? (
                                    <>Character</>
                                  ) : (
                                    d?.characters.available > 1 && (
                                      <>Characters</>
                                    )
                                  )}
                                </p>
                                <Link
                                  className="hover:scale-125 transition duration-300 ease-in-out cursor-pointer"
                                  to={`/series/${d?.id}/${d?.title.replace(
                                    /#/g,
                                    "Issue "
                                  )}/characters`}
                                >
                                  <FiExternalLink />
                                </Link>
                              </div>

                              <div
                                className={` ${
                                  d?.characters?.available >= 3
                                    ? "grid grid-cols-2"
                                    : "flex "
                                } items-center justify-between gap-5 w-full`}
                              >
                                {d.characters.items.map((item, index) => (
                                  <Link
                                    key={index}
                                    to={`/collection/${removeParentheses(
                                      item.name
                                    )}`}
                                    className="w-fit"
                                  >
                                    <div className="bg-slate-500 rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out py-1 px-3 font-normal">
                                      {item?.name}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {d?.events.available !== 0 && (
                            <Link
                              to={`/series/${d?.id}/${d?.title.replace(
                                /#/g,
                                "Issue "
                              )}/events`}
                            >
                              <button className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out text-center text-white flex gap-2 items-center justify-center px-6 py-2 font-bold rounded-xl cursor-pointer">
                                <p className="font-mono text-[#c0bdbd]">
                                  {d?.events.available}
                                </p>
                                <p className="font-semibold">
                                  {d?.events.available === 1 ? (
                                    <>Event</>
                                  ) : (
                                    d?.events.available > 1 && <>Events</>
                                  )}
                                </p>
                                <FiExternalLink />
                              </button>
                            </Link>
                          )}
                        </div>
                      )}

                      {tabIndex === 3 && (
                        <>
                          <div
                            className={` ${
                              d?.creators.items.length > 10
                                ? "grid grid-cols-2 "
                                : "flex flex-col justify-between"
                            }  gap-3 w-full`}
                          >
                            {d?.creators.items.map((c, index) => {
                              return (
                                <div
                                  className="flex items-center justify-between gap-2"
                                  key={index}
                                >
                                  <p className="capitalize text-slate-300 font-semibold">
                                    {c.role}:{" "}
                                    <span className="text-white">{c.name}</span>
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>

                    {/* <div className="grid grid-cols-2 gap-x-6  gap-y-3 justify-between w-full">
                        {d.type && (
                          <p className="font-semibold">
                            Type:
                            <span className="text-slate-300"> {d.type}</span>
                          </p>
                        )}

                        {d.rating && (
                          <p className="font-semibold">
                            Rating:
                            <span className="text-slate-300"> {d.rating}</span>
                          </p>
                        )}

                        <p className="font-semibold">
                          Start Year:{" "}
                          <span className="text-slate-300">{d.startYear}</span>
                        </p>

                        <p className="font-semibold">
                          End Year:{" "}
                          <span className="text-slate-300">{d.endYear}</span>
                        </p>

                        <p className="font-semibold w-full">
                          Modified:{" "}
                          <span className="text-slate-300">
                            {moment(d.modified).format("MMM DD, YYYY")}
                          </span>
                        </p>
                      </div> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SeriesDetails;
