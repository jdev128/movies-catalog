import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SearchField from "./components/SearchField";
import useFetch from "./hooks/useFetch";
import TMDBUtils from "./utils/TMDBUtils";

function App() {
  const { data, isLoading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(
      `${TMDBUtils.BASE_URL}${
        TMDBUtils.MOVIE_FILTER_ENDPOINT
      }?${TMDBUtils.getLastYearPopularMoviesParams()}`,
      "GET",
      null,
      TMDBUtils.getCommonHeaders()
    );
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log(JSON.stringify(data.results));
  }, [data]);

  return (
    <>
      <NavBar
        backgroundColor="hsl(161, 20%, 25%)"
        homeIcon={{ altTitle: "Movies Catalog Home", url: "/favicon.ico" }}
      >
        <SearchField
          placeholder="Find your next favorite movie"
          onConfirm={function (input) {
            alert(input);
          }}
        />
      </NavBar>
    </>
  );
}

export default App;
