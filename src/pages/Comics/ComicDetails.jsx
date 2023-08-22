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

  const comicDetails = data?.data?.results;

  useEffect(() => {
    document.body.scrollTop = 0;
    document.title = `${title} | Comics | Marvel-Verse`;
  }, [document]);

  console.log(comicDetails);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 text-white">
        <div>
          {comicDetails?.map((d) => {
            return (
              <div
                key={d.id}
                className="flex items-start justify-center flex-col lg:flex-row gap-x-5 gap-y-8"
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
                    <p className="font-semibold text-slate-300 font-mono">
                      {moment(d.modified).format("YYYY")}
                    </p>
                    <div className="font-serif">
                      {d.description ? (
                        HTMLReactParser(d.description)
                      ) : (
                        <div className="flex items-center justify-center">
                          Sorry no description provided
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="items-center justify-center flex">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-6 items-center justify-center">
                      <div>
                        {d.characters.available !== 0 ? (
                          <Link to={`/comics/${d.id}/${d.title}/characters`}>
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
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
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
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
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
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
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
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
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
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
