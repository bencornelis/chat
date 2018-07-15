const express = require('express');
const R = require('ramda');
const cassandraDB = require('./db/cassandra');
const postgresDB = require('./db/postgres');
const app = express();

const mapKeys = R.curry((fn, obj) =>
  R.fromPairs(R.map(R.adjust(fn, 0), R.toPairs(obj)))
);
const camelCase = (str) => str.replace(/[-_]([a-z])/g, m => m[1].toUpperCase());
const convertKeys = R.map(mapKeys(camelCase));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
});

app.get('/channels', async (req, res) => {
  const query = 'SELECT * FROM channels';

  let result;
  try {
    result = await cassandraDB.execute(query);
  } catch (error) {
    console.error('ERROR: getting all channels', error);
  }

  const channels = convertKeys(result.rows);
  console.log('DB: getting channels', channels);
  res.json({ channels });
});

app.get('/channels/:channelId/messages', async (req, res) => {
  const query = 'SELECT * FROM messages WHERE channel_id = ? ORDER BY sent_time ASC';

  let result;
  try {
    console.log('messages for channel id', req.params.channelId)
    result = await cassandraDB.execute(query, [ req.params.channelId ]);
  } catch (error) {
    console.error('ERROR: getting all messages', error);
  }

  const messages = convertKeys(result.rows);
  console.log(`DB: getting messages for channel ${req.params.channelId}`, messages);
  res.json({ messages });
});

app.listen(3001, () => console.log('Express server listening on port 3001...'));
