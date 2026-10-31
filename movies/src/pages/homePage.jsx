import { getDiscover } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import MasterIconList from '../components/cardIcons/masterList'
import { MoviesContext } from "../contexts/moviesContext";
import {react, useContext} from "react";

const HomePage = (props) => {
  const { mediaType, setMediaType } = useContext(MoviesContext);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover', { mediaType }],
    queryFn: getDiscover,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const media = data.results;
  const title = mediaType === "movie" ? "Discover Movies" : "Discover TV"
  //console.log(media);
  // // Redundant, but necessary to avoid app crashing.
  // const favorites = media.filter(m => m.favorite)
  // localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title={title}
      movies={media}
      action={(movie) => {
        return <MasterIconList movie={movie} />
      }}
    />
  );
};
export default HomePage;
