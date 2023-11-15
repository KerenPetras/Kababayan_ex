const express = require("express");
const http = require("http");
const path = require("path");

const {routesInit} = require("./routes/configRoutes")
// Login to the database
require("./db/mongoConnect")

const app = express();
// That we can send Buddy from client side
app.use(express.json());

// define a static folder that will be the folder called public
app.use(express.static(path.join(__dirname,"public")));

routesInit(app);


const server = http.createServer(app);
const port = 3001;
server.listen(port);
