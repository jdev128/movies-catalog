import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SearchField from "./components/SearchField";
import MovieCard from "./components/MovieCard";
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
    error && console.log(error);
  }, [error]);

  return (
    <>
      <header>
        <NavBar
          backgroundColor="hsl(159, 20%, 25%)"
          homeIcon={{ altTitle: "Movies Catalog Home", url: "/favicon.ico" }}
        >
          <SearchField
            placeholder="Find your next favorite movie"
            onConfirm={function (input) {
              alert(input);
            }}
          />
        </NavBar>
      </header>
      <main>
        {isLoading ? (
          <p className="message">Loading ...</p>
        ) : error ? (
          <p className="message">
            The next error occurred while trying to get the movies list:
            <p className="error">{error.toString()}</p>
            Please contact support team
          </p>
        ) : (
          data?.results.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              description={movie.overview}
              posterURL={`http://image.tmdb.org/t/p/w154${movie.poster_path}`}
              stars={movie.vote_average}
            />
          ))
        )}
      </main>
    </>
  );
}

export default App;
