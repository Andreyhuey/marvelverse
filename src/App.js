import "bootstrap/dist/css/bootstrap.css";
import {
  FetchCharacters,
  // FetchStories,
  //   FetchSeries,
  // FetchComics,
  //   FetchCreators,
  //   FetchEvents,
} from "./components";

function App() {
  return (
    <div className="bg-dark">
      <header className="p-1 bg-black">
        <div className="pt-1">
          <h1 className="text-warning text-uppercase mx-3">MARVEL</h1>
        </div>
      </header>

      <section className="container pb-5">
        <FetchCharacters />
      </section>

      {/*
      <section className="container py-5">
        <FetchComics />
      </section>

      <section className="container py-5">
        <FetchStories />
      </section>

      <section className="container py-5">
        <FetchCreators />
      </section>

      <section className="container py-5">
        <FetchSeries />
      </section>

      <section className="container py-5">
        <FetchEvents />
      </section> */}

      {/* <Homepage /> */}
      {/* <Characters /> */}

      <section className="container-fluid bg-black">
        <footer className="">
          <div className="row py-4 mt-2 text-muted">
            <div className="col-md-4 h4 text-start">footer</div>
            <div className="col-md-4 h4 text-center">footer</div>
            <div className="col-md-4 h4 text-end">footer</div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default App;
