import React, { useState } from "react";

const Search = ({ search }) => {
  const [text, setText] = useState("");

  const onSearch = (q) => {
    setText(q);
    search(q);
  };

  return (
    <section className="row d-flex justify-content-center mt-5">
      <div className="col-md-8">
        <form className="">
          <input
            type="text"
            id="form1"
            className="form-control"
            placeholder="Find a character"
            autoFocus
            onChange={(e) => onSearch(e.target.value)}
            value={text}
          />

          {/* <button className="btn btn-outline-primary">Search </button> */}
        </form>
      </div>
    </section>
  );
};

export default Search;
