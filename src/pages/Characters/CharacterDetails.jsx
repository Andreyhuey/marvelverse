import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetCharacterDetailsQuery } from "../../services/charactersApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";
import { BiSolidInfoCircle } from "react-icons/bi";

const CharacterDetails = () => {
  const [character, setCharacter] = useState();
  const { characterId, name } = useParams();
  const { data, isFetching } = useGetCharacterDetailsQuery(characterId);

  useEffect(() => {
    const characterDetails = data?.data?.results;
    console.log(characterDetails);
    setCharacter(characterDetails);
    document.title = `${name} | Characters | Marvel-Verse`;
    document.body.scrollTop = 0;
  }, [document, name, data]);

  if (isFetching) return <Loader />;

  return (
    <div>
      <>
        <div className="bg-gray-950 backdrop-blur-lg px-4 md:px-8 lg:px-20 py-10 text-white min-h-screen">
          <div>
            {character
              ? character?.map((d) => {
                  return (
                    <>
                      <div
                        key={d.id}
                        className={`flex  flex-col md:flex-row items-center gap-x-5 gap-y-8`}
                      >
                        <div className="flex-1 items-center justify-center flex">
                          <img
                            src={d.thumbnail.path && d.thumbnail.path + ".jpg"}
                            className=""
                            alt={"...image of " + d.name}
                          />
                        </div>

                        <div className="flex-1">
                          <h5 className="font-bold text-[26px] text-center md:text-start md:text-[33px] lg:text-[40px] capitalize ">
                            {d.name}
                          </h5>
                          <div className="flex flex-col justify-center items-start gap-2 max-w-lg">
                            <p className="font-bold text-lg">Overview:</p>
                            <p className="font-serif">
                              {d.description ? (
                                <>
                                  <p className="text-slate-300">
                                    {HTMLReactParser(d.description)}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <div className="text-slate-300 flex gap-2 items-center italic">
                                    <BiSolidInfoCircle className="text-red-500" />{" "}
                                    No description provided by
                                    <span className="text-red-500">MARVEL</span>
                                  </div>
                                </>
                              )}
                            </p>
                            <p className="font-semibold">
                              Modified:{" "}
                              <span className="text-slate-300">
                                {moment(d.modified).format("MMM DD, YYYY")}
                              </span>
                            </p>
                          </div>

                          <div className="grid grid-cols-3 py-6 justify-center gap-x-8 items-center">
                            {d.comics.available !== 0 && (
                              <Link to={`/characters/${d.id}/${d.name}/comics`}>
                                <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                  <p className="font-mono text-[#c0bdbd]">
                                    {d.comics.available}
                                  </p>
                                  <p className="font-mono">
                                    {d.comics.available == 1 ? (
                                      <>Comic</>
                                    ) : (
                                      d.comics.available > 1 && <>Comics</>
                                    )}
                                  </p>
                                </div>
                              </Link>
                            )}

                            {d.events.available !== 0 && (
                              <Link to={`/characters/${d.id}/${d.name}/events`}>
                                <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                  <p className="font-mono text-[#c0bdbd]">
                                    {d.events.available}
                                  </p>
                                  <p className="font-mono">
                                    {d.events.available == 1 ? (
                                      <>Event</>
                                    ) : (
                                      d.events.available > 1 && <>Events</>
                                    )}
                                  </p>
                                </div>
                              </Link>
                            )}

                            {d.series.available !== 0 && (
                              <Link to={`/characters/${d.id}/${d.name}/series`}>
                                <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                  <p className="font-mono text-[#c0bdbd]">
                                    {d.series.available}
                                  </p>
                                  <p className="font-mono">Series</p>
                                </div>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : ""}
          </div>
        </div>
      </>
    </div>
  );
};

export default CharacterDetails;
