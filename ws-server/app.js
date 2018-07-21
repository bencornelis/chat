const Websocket = require('ws');
const cassandra = require('cassandra-driver');
const TimeUuid = require('cassandra-driver').types.TimeUuid;

const dbClient = new cassandra.Client({ contactPoints: ['cassandra'], keyspace: 'chat' });
dbClient.connect(err => {
  if (err) { console.error(err) }
});

const wss = new Websocket.Server({ port: 3002 });

wss.on('connection', (ws) => {
  ws.on('message', async (_msg) => {
    console.log('received: %s', _msg)
    const { payload: { channelId, userId, content } } = JSON.parse(_msg);

    const query = 'INSERT INTO messages (channel_id, user_id, content, sent_time) VALUES(?, ?, ?, ?)';
    try {
      await dbClient.execute(query, [ channelId, userId, content, TimeUuid.now() ], { prepare : true });
    } catch (error) {
      console.error('ERROR: inserting message', error);
    }

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === Websocket.OPEN) {
        client.send(_msg);
      }
    });
  });
});
