const express = require('express');
const Websocket = require('ws');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
});

app.get('/', (req, res) => {
  console.log('yes this is a route')
});

const server = app.listen(3001, () => console.log('Express server listening on port 3001...'));

const wss = new Websocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', msg => {
    console.log('received: %s', msg);
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === Websocket.OPEN) {
        client.send(msg);
      }
    })
  });
});
