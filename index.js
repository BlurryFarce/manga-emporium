const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

const indexRouter = require('./routes/index');
//const mangasRouter = require('./routes/mangas');

const mangaDb = require("./modules/mangas/mangaDB"); //load mangaDB.js

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', indexRouter);
//app.use('/mangas', mangasRouter);

// Error handling
app.use((request, response,) => {
    const err = new Error('Not Found');
    err.status = 404;
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

