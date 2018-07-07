const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
});

const MESSAGE = 'Be yourself!';
app.get('/', (req, res) => {
  res.json({ msg: MESSAGE });
});

app.listen(3001, () => console.log('Express server listening on port 3001...'));
