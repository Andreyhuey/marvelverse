import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CollectionSeries,
  CollectionCharacters,
  CollectionEvents,
  CollectionComics,
} from "../../components";

const Collection = () => {
  const { searchTerm } = useParams();

  useEffect(() => {
    document.title = `${searchTerm} | Collection | Marvel-Verse`;
  }, [searchTerm]);

  return (
    <>
      <div className="bg-gray-950 text-white py-10 px-2 md:px-8 lg:px-20 min-h-screen">
        <div className="text-center text-[26px] py-6 font-[700] capitalize">
          {searchTerm} Collection
        </div>

        <div className="flex flex-col gap-10">
          {/* characters */}
          <CollectionCharacters searchTerm={searchTerm} />

          {/* comics */}
          <CollectionComics searchTerm={searchTerm} />

          {/* events */}
          <CollectionEvents searchTerm={searchTerm} />

          {/* series */}
          <CollectionSeries searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
};

export default Collection;
