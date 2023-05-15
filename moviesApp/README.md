# Enterprise Web Development - Assignment 1.

__Name:__ Aaron O'Brien   
__Youtube Link:__ (https://youtu.be/oUx6ucyQvAU)
## Overview.

Below is a list of features implemented to the Movies Application

Noticeable Changes on the UI
+ Pagination - Pagination is supported on Discover Movies, Upcoming Movies, TV
+ Added Cast and Crew for Movies 
+ Added a new View to see the Actors Details
+ Added Dicoverable TV Shows
+ Added a way to mark TV Shows as favorites
+ Added TV Shows to the Favorites View
+ Added TV Show Details
+ TV Show has a Clickable and Accordian view of Seasons
+ Added Season Details Season details that has an according view of season episodes
+ Added Episode Details with a Guest Star, and Crew view
+ Added an Account section allowing a user to login, logout and manage their account details.
+ Added a My Movies View
+ Added a way to create "My Movies" 
+ Added a "My Movie Details" page

Changes invisible to the UI
+ Integrated with supabase for authentication
+ Storing Favorite shows, movies in supabase
+ Storing Custom Movies to supabase
+ Deployed application to Vercel visilbe here [https://ewd-g4mqaogsp-setu-aaron.vercel.app/](https://ewd-g4mqaogsp-setu-aaron.vercel.app/)
+ Protected URL's to make sure logged in users can only do certain things.

## Feature Design.
#### Added Cast and Crew for Movies 
> Lists Cast and Crew from the selected movie
![Movie Cast and Crew](./readmeImages/cast_crew.png)
#### Added a new View to see the Actors Details
> Display the selected Actor's bio information
![Actor Details](./readmeImages/actorDetails.png)
#### Added Dicoverable TV Shows
> List tv shows from TMDB
![TV Shows](./readmeImages/tvShows.png)
#### Added a way to mark TV Shows as favorites
> Mark a TV Show as your favorite
![TV Show Marked Favorite](./readmeImages/tvShowMarkedFavorite.png)
#### Added TV Shows to the Favorites View
> Added Favorite TV Shows under Favorite Movies
![Favorite Movies and TV Shows](./readmeImages/favoriteMoviesAndShows.png)
#### Added TV Show Details
> Show the selected TV Show details including Cast and Crew
![Favorite Movies and TV Shows](./readmeImages/tvShowDetails.png)
#### TV Show has a Clickable and Accordian view of Seasons
> When expanding the season details in the accordian you can click on the link to see the details or just read the overview.
![Seasons Accordian](./readmeImages/seasonsAccordian.png)
#### Added Season Details Season details that has an according view of season episodes
> Season details shows a list of episodes in an accordian view
![Season Details](./readmeImages/episodesOverview.png)
#### Added Episode Details with a Guest Star, and Crew view
> Added Episode Details including guest starts adn Crew
![Season Details](./readmeImages/episodeDetail.png)
#### Added an Account section allowing a user to login, logout and manage their account details.
> If a user is logged in they have a list of options they can perform  
![Season Details](./readmeImages/manageAccount.png)  
> Manage Account allows the user to update some information  
![Season Details](./readmeImages/accountDetails.png)  
> All protected pages will redirect to this page to allow users to login with a magic link  
![Season Details](./readmeImages/login.png)  
#### Added a My Movies View
> A list of cusom movies created by the user
![Season Details](./readmeImages/customMovies.png)
#### Added a way to create "My Movies" 
> An empty view of creating a movie
![Season Details](./readmeImages/emptyNewMovie.png)
> Searching for Actors to add to a custom Movie
![Season Details](./readmeImages/newMovie.png)
#### Added a "My Movie Details" page
> Once a movie is selected details are available to review
![Season Details](./readmeImages/customMovieDetails.png)
e.g. 

## Storybook.
Story Book screen shots
> Illustrating the Episode Component  
![Episode](./readmeImages/storyBookEpisode.png)  

> Illustrating the Show Card similar to the Movie Card  
![Show Card](./readmeImages/storyBookShowCard.png)  

> Illustrating the Show Details  
![Show Details](./readmeImages/storyBookShowDetails.png) 

> Illustrating the Show Episodes  
![Show Episodes](./readmeImages/storyBookShowEpisodes.png) 

> Illustrating the Season Details  
![Season Details](./readmeImages/storyBookSeasonDetails.png)  

> Illustrating the Paginator  
![Paginator](./readmeImages/storyBookPaginator.png)  

> Illustrating the Movie Credits  
![Movie Credits](./readmeImages/storyBookMovieCredits.png)

> Illustrating the Person Card  
![Person Card](./readmeImages/storyBookPersonCard.png)  

> Illustrating the New Movie  
![New Movie](./readmeImages/storyBookNewMovie.png)  

> Illustrating the Search Actors component  
![Search Actors](./readmeImages/storyBookSearchActors.png)    

## Authentication.
Application Routes
+ / - home page of the application displays 20 movies from TMDB 
+ /movies/page/:id - url to support pagination of movies
+ /movies/:id/:favorite - url to support displaying movie details and if the movie is a favorite or not
+ /movies/favourites - url to support showing a list of favorites 
+ /movies/upcoming - url to support the result of a TMBD Search for upcoming movies
+ /movies/upcoming/page/:id - url to support pagination for upcoming movies
+ /reviews/:id - url to support reviews
+ /reviews/form - url to support creating a review
+ /person/:id - url to support reviewing the details of an actor or cat member
+ /show/page/:id - url to support pagination support of TV Shows
+ /show/:id/:favorite - url to support displaying show details and if the movie is a favorite or not
+ /show/:showId/season/:seasonId - url to support the display of the details of a season
+ /show/:showId/season/:seasonId/episode/:episodeId - url to support episode details
+ /myMovies - url to support the display of custom created movies
+ /myMovie/:id/:favorite - a url that shows the details of a movie
+ /myMovies/new - the url to crate a new movie
+ /login - the magic link login screen
+ /account - a screen to manage authenticated user functions

#### Protected features

Authenticated users have the following functionality:
+ Manage their account
+ logout 
+ create a custom Movie
+ view custom movies
+ view custom movie details

## Supabase (if relevant)
> Supabase auth table used by the magic link auth configuration
![Season Details](./readmeImages/supabaseAuthTable.png)
> Supabase tables used to store favorite movies, shows and custom movies
![Season Details](./readmeImages/supabaseDBTables.png)

## Deployment 
[Deployment URL](https://ewd-n9f5r7kg8-setu-aaron.vercel.app/)
> Home Page
![Vercel](./readmeImages/vercelHome.png)

I used the magic link to authenticate users.  To properly validate the magic link any tester would need to enter an e-mail address that they could receive the magic link to.

## Persistence.
Supabase was used to store user data.  Here is a view of the customMovies table:
> I basically stored the whole move object as JSON to allow an easier reuse of components that were based using the TMDB data structure.
![Season Details](./readmeImages/supabaseDBTables.png)  

> This table mirrors the local cache that was designed to store favorite movie ids
![Season Details](./readmeImages/supabaseFavoriteMovies.png)  

> For favorte TV Shows I followed the same pattern as favorite movies and am storing just the show Id
![Season Details](./readmeImages/supabaseFavoriteShows.png)  

> This is where profiles are stored if you wanted to add a name or website address it would be saved here.
![Season Details](./readmeImages/supabaseProfiles.png)  

## Additional Information.
I thought using the Magic Link for authentication was an interesting idea.  I did find out that using Safari the magic link didn't work very well - what is happening is that Safari is sending out a pre-check that uses the auth token, so that when the user clicks the link it has alreayd been expired.  Using Chrome fixed this problem but as a user authentication I would need to really research is this is a seucre way to onbaord users.  





# Personal Notes on the project:
## Movies Lab Project
This project came from a zip file
It uses storybook for component development and was created using [vitie](https://vitejs.dev/)

## Create a project with vitejs
```
 npm create vite@latest
 ```
 Here are some interesting [Vite Templates](https://github.com/vitejs/awesome-vite#templates) these are not used for this project.

 ## Run this project
 ```
 npm run dev
 ```

 ## Adding StoryBook
 (StoryBook)[https://storybook.js.org/] can be added to a new project with this command:
 ```
 npm install @storybook/builder-vite --save-dev
 ```

## The Movie Database Integration
[TMDB](https://www.themoviedb.org/?language=en-US) is used to develop this project.  The API_KEY can be found in the .env file, if you are checking this out fresh you will need your own api key and create the .env vile in the project root it should look like this:
```
VITE_TMDB_KEY=<apikey from tmbd>
```

## Docker
### Build  
```
cd proxy
docker build -t tmdbproxy .
docker run -d -p 8000:80 tmdbproxy

```

## NGINX
==> nginx
Docroot is: /opt/homebrew/var/www

The default port has been set in /opt/homebrew/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /opt/homebrew/etc/nginx/servers/.

To restart nginx after an upgrade:
  brew services restart nginx
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/nginx/bin/nginx -g daemon off;
(base) aaronobrien@air-de-aaron moviesApp % brew servers start nginx 
Error: Unknown command: servers
(base) aaronobrien@air-de-aaron moviesApp % brew services start nginx
==> Tapping homebrew/services
Cloning into '/opt/homebrew/Library/Taps/homebrew/homebrew-services'...
remote: Enumerating objects: 2430, done.
remote: Counting objects: 100% (2430/2430), done.
remote: Compressing objects: 100% (1142/1142), done.
remote: Total 2430 (delta 1133), reused 2337 (delta 1100), pack-reused 0
Receiving objects: 100% (2430/2430), 662.37 KiB | 2.75 MiB/s, done.
Resolving deltas: 100% (1133/1133), done.
Tapped 1 command (45 files, 830.5KB).
==> Successfully started `nginx` (label: homebrew.mxcl.nginx)
(base) aaronobrien@air-de-aaron moviesApp % code /opt/homebrew/etc/nginx/nginx.conf
(base) aaronobrien@air-de-aaron moviesApp % brew services restart nginx
Stopping `nginx`... (might take a while)
==> Successfully stopped `nginx` (label: homebrew.mxcl.nginx)
==> Successfully started `nginx` (label: homebrew.mxcl.nginx)
(base) aaronobrien@air-de-aaron moviesApp % brew services restart nginx
Stopping `nginx`... (might take a while)
==> Successfully stopped `nginx` (label: homebrew.mxcl.nginx)


## Configs
http dir
```
/opt/homebrew/var/www
```

Application setup UI:
```
cd /Users/aaronobrien/Desarrollo/SETU/ewd_lab/moviesApp
npm run build
cd dist
tar -cvf ui.tar ./*

mv ./ui.tar /opt/homebrew/var/www
cd /opt/homebrew/var/www
tar -xvf ./ui.tar
```

Services setup:
Services run under an epress service.  To start them you need mongo running:
```
docker pull mongo
docker run -d -p 27017:27017 --name test-mongo mongo:latest
cd /Users/aaronobrien/Desarrollo/SETU/ewd-api-labs-2023/
npm start
```