const BASE_URL = import.meta.env.VITE_MOVIES_BASE_URL;
const MOVIE_FILTER_ENDPOINT = import.meta.env.VITE_MOVIES_FILTER_ENDPOINT;
const MOVIE_FIND_ENDPOINT = import.meta.env.VITE_MOVIES_FIND_ENDPOINT;

const getCommonHeaders = () => {
  return [
    { name: "Authorization", value: `Bearer ${import.meta.env.VITE_MOVIES_API_TOKEN}` },
    { name: "Accept", value: "application/json" },
  ];
};

const getLastYearPopularMoviesParams = () => {
  const params = new URLSearchParams();
  params.append("include_adult", false);
  params.append("include_video", false);
  params.append("language", "en-US");
  params.append("page", 1);
  params.append("sort_by", "popularity.desc");
  params.append("vote_average.gte", 7);
  const currentDateMinusOneYear = new Date(Date.now() - 365 * 24 * 60 * 1000);
  params.append(
    "release_date.gte",
    currentDateMinusOneYear.toISOString().slice(0, 10)
  );
  return params;
};

const getSearchParams = (query) => {
  const params = new URLSearchParams();
  params.append("query", query);
  return params;
}

export default {
  getLastYearPopularMoviesParams,
  getSearchParams,
  getCommonHeaders,
  BASE_URL,
  MOVIE_FILTER_ENDPOINT,
  MOVIE_FIND_ENDPOINT
};
