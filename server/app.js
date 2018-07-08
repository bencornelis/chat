const express = require('express');
const Websocket = require('ws');
const cassandra = require('cassandra-driver');
const TimeUuid = require('cassandra-driver').types.TimeUuid;

const app = express();
const dbClient = new cassandra.Client({ contactPoints: ['cassandra'], keyspace: 'chat' });
dbClient.connect(err => {
  if (err) { console.error(err) }
});

const CHANNEL_ID = 'b0a03ba2-3655-4fee-bc6f-0963437a48cf';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
});

app.get('/messages', async (req, res) => {
  const query = 'SELECT * FROM messages WHERE channel_id = ? ORDER BY sent_time ASC';

  let result;
  try {
    result = await dbClient.execute(query, [ CHANNEL_ID ]);
  } catch (error) {
    console.error('ERROR: getting all messages', error);
  }

  const messages = result.rows.map(msg => msg.content);
  console.log('QUERYING DB', messages);
  res.json({ messages });
});

const server = app.listen(3001, () => console.log('Express server listening on port 3001...'));

const wss = new Websocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', async (msg) => {
    console.log('received: %s', msg);

    const query = 'INSERT INTO messages (channel_id, content, sent_time) VALUES(?, ?, ?)';
    try {
      await dbClient.execute(query, [ CHANNEL_ID, JSON.parse(msg), TimeUuid.now() ]);
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
