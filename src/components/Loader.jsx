import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen py-10 flex items-center justify-center bg-black fixed top-0 left-0 w-full h-full z-50">
      <BeatLoader
        color="#ffff"
        size={13}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
