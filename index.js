const mongoose = require("mongoose");
const express = require("express");
const https = require("https");
const path = require("path");
const logger = require("morgan");
const User = require('./database/models/Player')
const fs = require("fs");
const app = express();
const websocket = require('socket.io')
const jwtAuth = require('socketio-jwt-auth')
const socketio = require('socket.io')
const http = require('http')

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "./.production" });
} else {
  require("dotenv").config({ path: "./.development" });
}

app.use(logger("dev"));
const PORT = process.env.PORT || 8000;

//middlewares
app.use(require("helmet")());
app.use(require("cors")());
app.use(express.json());
mongoose.connect(process.env.CONNECT_STRING);

//SOCKETS//
const httpServer = http.createServer(app)

//sockets                                                                                                                                                                                                                                                    
const io = socketio(httpServer, {
  cors: { origin: '*' }
})

//on success connection
//save socket id as raspSocketId for user document
io.on('connection', (socket) => {
  const { userId } = socket.handshake.query
  User.findByIdAndUpdate(userId, { raspSocketId: socket.id }, (err, user) => {
    console.log('err', err)
    console.log('user', user)
  })
})

//routes
app.use("/api", require("./routes/routes")(io));

//errors handler
app.use(require("./middleware/errors.middleware"));

//start server 
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`server listen on ${PORT}`);
});

