

  export const getMovies = (cPage) => {
    console.log("API's getMovies called with page: ", cPage);
    const page = cPage.queryKey[1];
    console.log("API's getMovies called with page: ", page);
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  export const getShows = (cPage) => {
    console.log("API's getShows called with page: ", cPage);
    const page = cPage.queryKey[1];
    console.log("API's getShows called with page: ", page);
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  export const getUpcomingMovies = (cPage) => {
    const page = cPage.queryKey[1];
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };
  
  export const getMovie = (args) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    console.log("ID Part: ", idPart)
    const { id } = idPart;
    console.log("ID: ", id)
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    console.log("URL: ", url)
    return fetch(
      url
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  export const getShow = (args) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    console.log("ID Part: ", idPart)
    const { id } = idPart;
    console.log("ID: ", id)
    let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    console.log("URL: ", url)
    return fetch(
      url
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };
  export const getShowImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getMovieCredits = (args) => {
    console.log("MC", args)
    const [, idPart] = args.queryKey;
    console.log("MC ID Part: ", idPart)
    const { id } = idPart;
    console.log("MCID: ", id)

    console.log("Getting Movie Credits for: ", id)
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    console.log("Movie Credits URL: ", url)
    return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log("Error calling url: ", {url});
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  export const getEpisodeDetails = (args) => {
    const [, showId, seasonId, episodeId] = args.queryKey;
    let url = `https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}/episode/${episodeId}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    console.log("Movie Credits URL: ", url)
    return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log("Error calling url: ", {url});
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  }
  
  export const getSeasonDetails = (args) => {
    const [, showId, seasonId] = args.queryKey;
    let url = `https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    console.log("Movie Credits URL: ", url)
    return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log("Error calling url: ", {url});
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  }
  
  export const getShowCredits = (args) => {
    console.log("MC", args)
    const [, idPart] = args.queryKey;
    console.log("MC ID Part: ", idPart)
    const { id } = idPart;
    console.log("MCID: ", id)

    console.log("Getting Show Credits for: ", id)
    let url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    console.log("Movie Credits URL: ", url)
    return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log("Error calling url: ", {url});
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };
  
  export const getPerson = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    let url = `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log("Error calling url: ", {url});
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  export const searchPerson = (searchValue) => {
    console.log(searchValue)
    const encodedQueryString = encodeURIComponent(searchValue);
    let url = `https://api.themoviedb.org/3/search/person?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${encodedQueryString}&include_adult=false`
    console.log("Calling URL: ", url)
    return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log("Error calling url: ", {url});
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  
  