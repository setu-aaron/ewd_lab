# Movies Lab Project
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