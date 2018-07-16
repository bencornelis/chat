import express from 'express';
import controllers from './controllers';
import bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token';
import cors from 'cors';

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bearerToken());
app.use(bodyParser.json());

app.use('/api', controllers);

app.listen(3001, () => console.log('Express server listening on port 3001...'));
