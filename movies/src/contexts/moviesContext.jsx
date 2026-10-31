import {React, useState, createContext} from "react";

export const MoviesContext = createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [watchList, setWatchList] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mediaType, setMediaType] = useState("movie")

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)){
      setFavorites([...favorites, movie.id]);
    }
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToWatchList = (movie) => {
    if (!watchList.includes(movie.id)){
      setWatchList([...watchList, movie.id]);
    }
    //console.log(watchList);
  };

  const removeFromWatchList = (movie) => {
    setWatchList( watchList.filter(
      (mId) => mId !== movie.id
    ) )
    //console.log(watchList);
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        watchList,
        addToWatchList,
        removeFromWatchList,
        addReview,
        mediaType,
        setMediaType
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
