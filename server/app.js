const express = require('express');
const Websocket = require('ws');
const cassandra = require('cassandra-driver');
const TimeUuid = require('cassandra-driver').types.TimeUuid;

const app = express();
const dbClient = new cassandra.Client({ contactPoints: ['cassandra'], keyspace: 'chat' });
dbClient.connect(err => {
  if (err) { console.error(err) }
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
});

app.get('/messages/:channelId', async (req, res) => {
  const query = 'SELECT * FROM messages WHERE channel_id = ? ORDER BY sent_time ASC';

  let result;
  try {
    result = await dbClient.execute(query, [ req.params.channelId ]);
  } catch (error) {
    console.error('ERROR: getting all messages', error);
  }

  const messages = result.rows;
  console.log('QUERYING DB', messages);
  res.json({ messages });
});

const server = app.listen(3001, () => console.log('Express server listening on port 3001...'));

const wss = new Websocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', async (msg) => {
    console.log('received: %s', msg);
    const { channelId, content } = JSON.parse(msg);

    const query = 'INSERT INTO messages (channel_id, content, sent_time) VALUES(?, ?, ?)';
    try {
      await dbClient.execute(query, [ channelId, content, TimeUuid.now() ]);
    } catch (error) {
      console.error('ERROR: inserting message', error);
    }

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === Websocket.OPEN) {
        client.send(msg);
      }
    });
  });
});
