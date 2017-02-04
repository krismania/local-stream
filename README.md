# local-stream
stream your stuff around your house

### Setting up
First, install dependencies with `npm install`.

Next, build the react app and server with `npm run build-client` and `npm run build-server`.

To start the server, use `npm run server`.

### Folder Structure
```
│
├── public
│   Static content folder
│
└─┬ src
  ├── client
  │   Root of the client-facing react app
  │   
  └─┬ server
    │ Root of the server (an express app)
    │
    └── modules
        Each route lives in it's own module
        They are instances of Express.Router()
```
