const express = require('express');
const app = express();
const Server = require('http').Server;
const server = Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const cors = require('cors');

const socketEvents = require('./socketEvents');
const router = require('./router.js');
const config = require('./config/config.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {;
  let token = req.headers.token;
  if (!token) {
    req.token = undefined
    return await next();
  } else req.token = token;
  return await next();
});

const corsOptions = {origin: config.cors};

app.use(cors(corsOptions));

app.use(router);

socketEvents(io);

server.listen(config.port, () => console.log('server running on port ' + config.port));
