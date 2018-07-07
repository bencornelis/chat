const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
});

app.get('/:msg', (req, res) => {
  res.json({ msg: `Received message: ${req.params.msg}` })
});

app.listen(3001, () => console.log('Express server listening on port 3001...'));
