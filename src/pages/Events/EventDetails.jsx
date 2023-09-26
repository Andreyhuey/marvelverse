import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetEventDetailsQuery } from "../../services/eventsApi";
import { Link } from "react-router-dom";
import moment from "moment";
import { Loader } from "../../components";

const EventDetails = () => {
  const { eventId, title } = useParams();
  const [event, setEvent] = useState();
  const { data, isFetching } = useGetEventDetailsQuery(eventId);

  useEffect(() => {
    const eventDetails = data?.data?.results;
    setEvent(eventDetails);
    document.title = `${title} | Events | Marvel-Verse`;
    document.body.scrollTop = 0;
  }, [data, title, setEvent]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 text-white min-h-screen">
        <div>
          {event &&
            event?.map((d) => {
              return (
                <div
                  key={d.id}
                  className="flex items-center justify-center flex-col lg:flex-row gap-x-5 gap-y-8"
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
                      <h5 className="font-extrabold text-[40px] uppercase text-center">
                        {d.title}
                      </h5>
                      <p className="font-semibold text-slate-300 font-mono">
                        {moment(d.end).format("YYYY")}
                      </p>
                      <p className="font-serif">
                        {HTMLReactParser(d.description)}
                      </p>
                    </div>

                    <div className="items-center justify-center flex">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-6 items-center justify-center">
                        <div>
                          {d.characters.available !== 0 && (
                            <Link to={`/events/${d.id}/${d.title}/characters`}>
                              <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                <p className="font-mono text-[#c0bdbd]">
                                  {d.characters.available}
                                </p>
                                <p className="font-mono">
                                  {d.characters.available === 1 ? (
                                    <>Character</>
                                  ) : (
                                    d.characters.available > 1 && (
                                      <>Characters</>
                                    )
                                  )}
                                </p>
                              </div>
                            </Link>
                          )}
                        </div>
                        <div>
                          {d.comics.available !== 0 && (
                            <Link to={`/events/${d.id}/${d.title}/comics`}>
                              <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                <p className="font-mono text-[#c0bdbd]">
                                  {d.comics.available}
                                </p>
                                <p className="font-mono">
                                  {d.comics.available === 1 ? (
                                    <>Comic</>
                                  ) : (
                                    d.comics.available > 1 && <>Comics</>
                                  )}
                                </p>
                              </div>
                            </Link>
                          )}
                        </div>
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

export default EventDetails;
