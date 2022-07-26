import "bootstrap/dist/css/bootstrap.css";
import { Homepage } from "./characters";
import { Footer, FetchCharacters, Example } from "./components";

// FetchCharacterName,
// FetchStories,
// FetchSeries,
// FetchComics,
// FetchCreators,
// FetchEvents,

function App() {
  return (
    <div className="bg-dark">
      <header className="p-1 bg-black">
        <div className="pt-1">
          <h1 className="text-warning text-uppercase mx-3">MARVEL</h1>
        </div>
      </header>
      <Example />
      <Homepage />
      {/* <FetchCharacters /> */}
      <Footer />
    </div>
  );
}

// DisplayHeader
/* <section className="container py-3">
</section>


<section className="container py-3">
  <FetchComics />
</section>

<section className="container py-3">
  <FetchStories />
</section>

<section className="container py-3">
  <FetchSeries />
</section>

<section className="container py-3">
  <FetchEvents />
</section>

<section className="container py-3">
  <FetchCreators />
</section> */

export default App;
