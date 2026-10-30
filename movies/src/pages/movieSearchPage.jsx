import React from "react";
import SearchBox from "../components/searchBox/searchBox";
import { searchMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';

const MovieSearchPage = ( props ) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  console.log("Search term:", searchTerm);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['search', {query: searchTerm}],
    queryFn: searchMovies,
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
  })
  console.log("data:", data);
  console.log("error:", error);
  return (
    <>
      <SearchBox onSearch={setSearchTerm} />
    </>
  );
};

export default MovieSearchPage;
