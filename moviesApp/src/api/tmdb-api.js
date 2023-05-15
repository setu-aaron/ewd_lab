

  export const getMovies = (cPage) => {
    console.log("API's getMovies called with page: ", cPage);
    const page = cPage.queryKey[1];
    console.log("API's getMovies called with page: ", page);

    let url = "http://localhost:8001/api/movies/page/" + page;
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    });
  };

  export const getShows = (cPage) => {
    console.log("API's getShows called with page: ", cPage);
    const page = cPage.queryKey[1];
    console.log("API's getShows called with page: ", page);
    let url = `http://localhost:8001/api/shows/page/${page}`;
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then((response) => {
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
    console.log("API's getUpcomingMovies called with page: ", page )
    return fetch(
      `http://localhost:8001/api/movies/upcoming/page/${page}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
      }
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
    let url = `http://localhost:8001/api/movies/${id}`
    console.log("URL: ", url)
    console.log("Token: ", localStorage.getItem('token'));
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then((response) => {
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
    let url = `http://localhost:8001/api/shows/${id}`
    console.log("URL: ", url)
    console.log("Token: ", localStorage.getItem('token'));
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then((response) => {
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
    let url = `http://localhost:8001/api/genres/`
    //let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY }&language=en-US"`
    console.log("URL: ", url)
    console.log("Token: ", localStorage.getItem('token'));
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then((response) => response.json())
    .then((data) => {
      console.log("Genres data: ", data);
      return data;
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieImages = ( args ) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    console.log("ID Part: ", idPart)
    const { id } = idPart;
    console.log("ID: ", id)
    let url = `http://localhost:8001/api/movies/${id}/images`
    console.log("Movie Images URL: ", url)
    console.log("Token: ", localStorage.getItem('token'));
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };
  export const getShowImages = (args) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    console.log("ID Part: ", idPart)
    const { id } = idPart;
    console.log("ID: ", id)
    let url = `http://localhost:8001/api/shows/${id}/images`
    console.log("Shows Images URL: ", url)
    console.log("Token: ", localStorage.getItem('token'));
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then( (response) => {
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
      `http://localhost:8001/api/movies/reviews/${id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
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
    let url = `http://localhost:8001/api/movies/credits/${id}`
    console.log("Movie Credits URL: ", url)
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
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
    let url = `http://localhost:8080/api/shows/${showId}/season/${seasonId}/episode/${episodeId}`
    //let url = `https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}/episode/${episodeId}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    console.log("Movie Credits URL: ", url)
    return fetch(url,{
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
    })
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
    let url = `http://localhost:8001/api/shows/${showId}/season/${seasonId}`
    console.log("Movie Credits URL: ", url)
    return fetch(url,{
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
    })
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

    console.log("Getting Movie Credits for: ", id)
    let url = `http://localhost:8001/api/shows/${id}/credits`
    console.log("Movie Credits URL: ", url)
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
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
    let url = `http://localhost:8001/api/person/${id}`
    console.log("Person URL ", url)
    return fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
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

  export const saveUser = (userEmail) => {
    console.log("Working with email: ", userEmail);
    //const encodedemail = encodeURIComponent(userEmail);
    console.log("Encoded email: ", userEmail);
    let myBody = {
      "firstName": "Supabase User",
      "lastName": "Supabase User",
      "email": userEmail,
    };
    let bodyString = JSON.stringify(myBody);
    console.log("Body String: ", bodyString);
    let url = "http://localhost:8001/api/accounts";
    //let url = "/services/api/accounts"
    //let url = "api/accounts/"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyString,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userEmail", data.email);
      validateUser(userEmail);
      return data;
    })
    .catch((error) => console.log("Error calling url", url, error));
  };


  export const validateUser = (userEmail) => {
    console.log("Validate User working with email: ", userEmail);
    const encodedemail = encodeURIComponent(userEmail);
    let url = "http://localhost:8001/api/accounts/security/token"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": userEmail,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data: ", data);
      localStorage.setItem("token", data.token);
      return data;
    })
    .catch((error) => console.log(error));
  };