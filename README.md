# local-stream
stream your stuff around your house

### Setting up
First, install dependencies with `npm install`.

Next, build the react app and server with `npm run build-client` and `npm run build-server`.

To start the server, use `npm start`.

#### Changing Port
To run on a host/port other than the default, create a `.env` file in the root directory and specify the correct values:
```
host=10.0.0.42
port=9000
```

### Folder Structure
```
│
├── build (generated)
│   when either build command is run, output is dumped into
│   this folder. Bundle.js is also served from here.
│
├─┬ src
│ │
│ ├── client
│ │   Root of the client-facing react app
│ │
│ └─┬ server
│   │ Root of the server (an express app)
│   │
│   └── modules
│       Each route lives in it's own module
│       They are instances of Express.Router()
│       
└─┬ static
  │ Express serves static content from here
  │
  ├─┬ media
  │ │ Episodes live here, sorted in folders by show ID
  │ │
  │ └─┬ [showId]
  │   │ contains show's info.json, and cover.png, as well as
  │   │ folders for each of the show's seasons
  │   │
  │   └── [seasonNum]
  │       contains season.json, as well as .mp4 and .vtt files for each
  │       episode. files are named by episode number, e.g. 13.mp4 and 13.vtt
  │
  └── users
      Each user has a folder which holds their watched list
```

### Serving Shows
Each show resides in it's own folder in /static/media. The folder should be a human-readable identifier string for the show, but should not use special characters or spaces.

##### Show Folder
Each show folder should have an `info.json`, a `cover.png`, and at least one season folder. `info.json` should look like:
```
{
  "title": [String, friendly name of the show with special chars],
  "year": [String, first broadcast year of the show]
}
```

`cover.png` should be about 960px x 540px, and is used on the list page, as well as each show's seasons/eps pages.

Season folders should be named after their season's number (e.g. "1", "2", "3").

##### Season Folder
Each season folder contains a `season.json`, and at least one .mp4 file.

`season.json` should look like:
```
{
  "title": [String, friendly name of the season],
  "episodes": [
    {
      "num": [int, episode number],
      "title": [String, friendly title of the episode]
    },
    ...
  ]
}
```

.mp4 files should be named according to their episode num, e.g. 4.mp4.

This folder may also contain other files related to episodes, such as subtitle files (.vtt). When an episode is played, the player will look for subtitles at [episode].vtt.
