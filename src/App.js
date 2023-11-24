import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Homepage,
  //
  Characters,
  CharacterDetails,
  CharacterComics,
  CharacterEvents,
  CharacterSeries,
  //
  Comics,
  ComicDetails,
  ComicCharacters,
  ComicEvents,
  //
  Events,
  EventDetails,
  EventsCharacters,
  EventComics,
  //
  Series,
  SeriesDetails,
  SeriesCharacters,
  SeriesComics,
  //
  Search,
  Collection,
  ComicSeriesSearch,
  ComicSearch,
  SignIn,
} from "./pages";
import { Footer, Navbar } from "./components";

const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="md:pt-20 pt-12 min-h-screen">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          {/* search */}

          <Route exact path={"/search"}>
            <Search />
          </Route>
          {/* comic series search */}
          <Route exact path={"/series/:searchTerm"}>
            <ComicSeriesSearch />
          </Route>
          {/* comic search */}
          <Route exact path={"/comics/search"}>
            <ComicSearch />
          </Route>

          {/*collection  */}
          <Route exact path="/collection/:searchTerm">
            <Collection />
          </Route>

          {/* Characters */}
          <Route exact path="/characters">
            <Characters />
          </Route>
          {/* CharacterDetails */}
          <Route exact path="/characters/:characterId/:name">
            <CharacterDetails />
          </Route>
          {/* Character Comics */}
          <Route exact path="/characters/:characterId/:name/comics">
            <CharacterComics />
          </Route>
          {/* Character Events */}
          <Route exact path="/characters/:characterId/:name/events">
            <CharacterEvents />
          </Route>
          {/* Character Series */}
          <Route exact path="/characters/:characterId/:name/series">
            <CharacterSeries />
          </Route>

          {/* Events */}
          <Route exact path="/events">
            <Events />
          </Route>
          {/* Event Details */}
          <Route exact path="/events/:eventId/:title">
            <EventDetails />
          </Route>
          {/* Event Characters */}
          <Route exact path="/events/:eventId/:title/characters">
            <EventsCharacters />
          </Route>
          {/* Event Comics */}
          <Route exact path="/events/:eventId/:title/comics">
            <EventComics />
          </Route>

          {/* Comics */}
          <Route exact path="/comics">
            <Comics />
          </Route>
          {/* Comic Details */}
          <Route exact path="/comics/:comicId/:title">
            <ComicDetails />
          </Route>
          {/* Comic Characters */}
          <Route exact path="/comics/:comicId/:title/characters">
            <ComicCharacters />
          </Route>
          {/* Comic Events */}
          <Route exact path="/comics/:comicId/:title/events">
            <ComicEvents />
          </Route>

          {/* Series */}
          <Route exact path="/series">
            <Series />
          </Route>
          {/* Series Details */}
          <Route exact path="/series/:seriesId/:title">
            <SeriesDetails />
          </Route>
          {/* Series Characters */}
          <Route exact path="/series/:seriesId/:title/characters">
            <SeriesCharacters />
          </Route>
          {/* Series Comics */}
          <Route exact path="/series/:seriesId/:title/comics">
            <SeriesComics />
          </Route>

          {/* Signin*/}
          <Route exact path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
