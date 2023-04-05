import React from "react";
import "./darkMode.css";
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopeOpen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
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
} from "./pages";

library.add(faGithub, faLinkedin, faEnvelopeOpen, faSearch);

function App() {
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // //function to change toggle the Theme
  // const toggleTheme = () => {
  //   if (theme === "light") {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   document.body.className = theme;
  // }, [theme]);

  return (
    <div className={`bg-dark text-white`}>
      <>
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
        </Switch>
      </>
    </div>
  );
}

export default App;
