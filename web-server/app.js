import express from 'express';
import controllers from './controllers';
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
});

app.use('/api', controllers);

app.listen(3001, () => console.log('Express server listening on port 3001...'));
