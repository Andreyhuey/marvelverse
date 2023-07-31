import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Switch, Route } from "react-router-dom";
import {
  Homepage,
  //
  Characters,
  CharactersId,
  CharacterComics,
  CharacterEvents,
  CharacterSeries,
  CharacterStories,
  //
  Comics,
  ComicsId,
  ComicCharacters,
  ComicCreators,
  ComicStories,
  //
  Creators,
  //
  Events,
  EventsId,
  EventCharacters,
  EventComics,
  //
  Series,
  //
  Stories,
  //
  Test,
} from "./pages";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <div className={`bg-dark text-white`}>
      <>
        <Navbar />
        <Switch>
          {/* Homepage */}
          <Route exact path="/">
            <Homepage />
          </Route>
          {/* Character Pages */}
          <Route exact path="/characters">
            <Characters />
          </Route>
          <Route exact path="/characters/:characterId">
            <CharactersId />
          </Route>
          <Route exact path="/characters/:characterId/comics">
            <CharacterComics />
          </Route>
          <Route exact path="/characters/:characterId/events">
            <CharacterEvents />
          </Route>
          <Route exact path="/characters/:characterId/series">
            <CharacterSeries />
          </Route>
          <Route exact path="/characters/:characterId/stories">
            <CharacterStories />
          </Route>
          {/* Comic Pages */}
          <Route exact path="/comics">
            <Comics />
          </Route>
          <Route exact path="/comics/:comicId">
            <ComicsId />
          </Route>
          <Route exact path="/comics/:comicId/characters">
            <ComicCharacters />
          </Route>
          <Route exact path="/comics/:comicId/creators">
            <ComicCreators />
          </Route>
          <Route exact path="/comics/:comicId/stories">
            <ComicStories />
          </Route>
          {/* Creator Pages */}
          <Route exact path="/creators">
            <Creators />
          </Route>
          {/* Events Pages */}
          <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/events/:eventId">
            <EventsId />
          </Route>
          <Route exact path="/events/:eventId/characters">
            <EventCharacters />
          </Route>
          <Route exact path="/events/:eventId/comics">
            <EventComics />
          </Route>
          {/* Creator Pages */}
          <Route exact path="/series">
            <Series />
          </Route>
          {/* Creator Pages */}
          <Route exact path="/stories">
            <Stories />
          </Route>
          {/* Test Pages */}
          <Route exact path="/test">
            <Test />
          </Route>
        </Switch>
        <Footer />
      </>
    </div>
  );
}

export default App;
