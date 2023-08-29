import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetComicDetailsQuery } from "../../services/comicsApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";

const ComicDetails = () => {
  const { comicId, title } = useParams();
  const { data, isFetching } = useGetComicDetailsQuery(comicId);
  const [comic, setComic] = useState();

  useEffect(() => {
    const comicDetails = data?.data?.results;
    console.log(comicDetails);
    setComic(comicDetails);
    document.title = `${title} | Comics | Marvel-Verse`;
    document.body.scrollTop = 0;
  }, [data, title]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 min-h-screen text-white">
        <div>
          {comic ? (
            comic.map((d) => {
              return (
                <div
                  key={d.id}
                  className="flex items-center lg:items-start justify-center flex-col lg:flex-row gap-x-5 gap-y-8"
                >
                  <div className="flex-1">
                    <img
                      src={d.thumbnail.path && d.thumbnail.path + ".jpg"}
                      className="card-img-top"
                      alt={"...image of " + d.title}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col justify-center items-start gap-4">
                      <h5 className="font-extrabold text-[30px] capitalize text-center">
                        {d.title}
                      </h5>

                      <div className="font-serif">
                        <p className="text-lg font-bold">Overview: </p>

                        {d.description ? (
                          <p className="text-slate-300">
                            {HTMLReactParser(d.description)}
                          </p>
                        ) : (
                          <div className="text-slate-300">
                            Sorry no description provided by
                            <span className="text-red-500 ml-1">MARVEL</span>
                          </div>
                        )}
                      </div>

                      <p className="font-mono">
                        Price :
                        <span className="text-slate-300">
                          ${d.prices[0].price}
                        </span>
                      </p>
                      <p className="font-mono">
                        Format:
                        <span className="text-slate-300"> {d.format}</span>
                      </p>
                      <p className="font-mono">
                        Page Count:
                        <span className="text-slate-300"> {d.pageCount}</span>
                      </p>
                      <p className="font-mono">
                        Issue Number:
                        <span className="text-slate-300"> {d.issueNumber}</span>
                      </p>

                      <p className="font-semibold  font-mono">
                        Date:{" "}
                        <span className="text-slate-300">
                          {moment(d.modified).format("MMM DD, YYYY")}
                        </span>
                      </p>
                    </div>

                    <div className="items-start justify-start flex">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-6 items-center justify-center">
                        <div>
                          {d.characters.available !== 0 ? (
                            <Link to={`/comics/${d.id}/${d.title}/characters`}>
                              <div className="bg-slate-900 hover:text-red-500 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                <p className="font-mono text-[#c0bdbd]">
                                  {d.characters.available}
                                </p>
                                <p className="font-mono">Characters</p>
                              </div>
                            </Link>
                          ) : (
                            ""
                          )}
                        </div>
                        <div>
                          {d.events.available !== 0 ? (
                            <Link to={`/comics/${d.id}/${d.title}/events`}>
                              <div className="bg-slate-900 hover:text-red-500 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                <p className="font-mono text-[#c0bdbd]">
                                  {d.events.available}
                                </p>
                                <p className="font-mono">Events</p>
                              </div>
                            </Link>
                          ) : (
                            ""
                          )}
                        </div>

                        {/* <div>
                        {d.creators.available !== 0 ? (
                          <Link to={`/comics/${d.id}/${d.title}/creators`}>
                            <div className="bg-slate-900 hover:text-red-500 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.creators.available}
                              </p>
                              <p className="font-mono">Creators</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>
                        {d.series.available !== 0 ? (
                          <Link to={`/comics/${d.id}/${d.title}/series`}>
                            <div className="bg-slate-900 hover:text-red-500 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.series.available}
                              </p>
                              <p className="font-mono">Series</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>
                        {d.stories.available !== 0 ? (
                          <Link
                            to={`/comics/${d.id}/${d.title}/stories
`}
                          >
                            <div className="bg-slate-900 hover:text-red-500 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.stories.available}
                              </p>
                              <p className="font-mono">Stories</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div> */}
                      </div>
                    </div>

                    <div className="font-semibold  font-mono">
                      <p className="text-lg">Creators:</p>
                      <span className="pb-1">
                        {d.creators.items.map((c) => {
                          return (
                            <div
                              key={c.role}
                              className="flex items-center justify-start gap-2"
                            >
                              <p className="capitalize">{c.role}:</p>
                              <p className="text-slate-300">{c.name}</p>
                            </div>
                          );
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 min-h-screen text-white flex items-center justify-center">
                <p>No details provided</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ComicDetails;
