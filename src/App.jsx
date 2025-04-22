import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SearchField from "./components/SearchField";
import MovieCard from "./components/MovieCard";
import useFetch from "./hooks/useFetch";
import MovieAPIUtils from "./utils/MovieAPIUtils";

function App() {
  const { data, isLoading, error, fetchData } = useFetch();

  const getDefaultMovies = () => {
    fetchData(
      `${MovieAPIUtils.BASE_URL}${
        MovieAPIUtils.MOVIE_FILTER_ENDPOINT
      }?${MovieAPIUtils.getLastYearPopularMoviesParams()}`,
      "GET",
      null,
      MovieAPIUtils.getCommonHeaders()
    );
  }

  const searchMovies = (query) => {
    if (query) {
      fetchData(
        `${MovieAPIUtils.BASE_URL}${
          MovieAPIUtils.MOVIE_FIND_ENDPOINT
        }?${MovieAPIUtils.getSearchParams(query)}`,
        "GET",
        null,
        MovieAPIUtils.getCommonHeaders()
      );
    } else {
      getDefaultMovies();
    }
  };

  useEffect(() => {
    getDefaultMovies();
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
            onConfirm={searchMovies}
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
        ) : data?.results.length === 0 ? (
          <p className="message">
            We couldn't find any movie that matches what you're looking for :/
            <br />
            <br />
            Please try again..
          </p>
        ) : (
          data?.results.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              description={movie.overview}
              posterURL={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                  : null
              }
              stars={movie.vote_average}
            />
          ))
        )}
      </main>
    </>
  );
}

export default App;
