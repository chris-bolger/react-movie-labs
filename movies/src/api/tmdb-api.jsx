export const getDiscover = (args) => {
  const [, media] = args.queryKey
  const { mediaType } = media;
  return fetch(
    `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getMedia = (args) => {
  const [, media] = args.queryKey;
  const { mediaType, id } = media;
  return fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};


  export const getMediaImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id, mediaType } = idPart;
    console.log("QueryKey ", queryKey, " idPart: ", idPart, " mediaType: ", mediaType, " id: ", id);
    return fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


export const getUpcomingMedia = ({queryKey}) => {
  const [, queryPart] = queryKey;
  const {mediaType} = queryPart;
  let endpoint;
  console.log("Media type: ", mediaType);
  if(mediaType === "movie"){
    endpoint = "movie/upcoming"
  }else{
    endpoint = "tv/on_the_air"
  }
  return fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`)
  .then(response => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    // console.log(response.json())
    return response.json();
  })
  .then((response) => response.results)
  .catch((error) => {
    throw error
  });
};

export const getRecommended = ({queryKey}) => {
  const [, idPart] = queryKey;
  const { id, mediaType } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  ).then(response => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    // console.log(response.json())
    return response.json();
  })
  .then((response) => response.results)
  .catch((error) => {
    throw error
  });
};

export const searchDatabase = ({queryKey}) => {
  const [, queryPart] = queryKey;
  const { query, mediaType } = queryPart;
  if(!query || query === "") {
    return Promise.resolve([]);
  }
  const response = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  return fetch(response).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .then((response) => response.results)
  .catch((error) => {
    throw error
  });
};