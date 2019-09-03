# LIRI Bot

---

LIRI Bot is a node powered search tool.

- search for upcoming concerts
- search for songs
- search for movies
- use the random-tool and see what it gives you!

## How to use...

---

After navigating to the file in your terminal use "node liri.js **\_\_\_**(search command) **\_\_\_** (user input)"

### Search Methods Available!

- to search for concerts, use search command: concert-this
- to search for movies, use search command: movie-this
- to search for songs, use search command: spotify-this- song
- to get a random result, use: do-what-it-says

  **For example a typical search might look like this:**

  > node liri.js concert-this lumineers
  > node liri.js movie-this casablanca
  > node liri.js spotify-this-song light my fire

#### concert-this:

takes in user input of artist or band name and returns venues, locations and the date of an event -- powered by BandsInTown

#### movie-this:

takes in user input of a movie or film and returns the year released, its rating and a Rotten Tomatoes score -- powered by OMDB

#### spotify-this-song:

takes in user input of a song and returns the artist/band, album, and a preview link -- powered by Spotify

## Tech Used

---

- Nodejs
- Node packages
- API's
  - BandsInTown
  - OMDB
  - Spotify
