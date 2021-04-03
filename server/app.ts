import cors from 'cors';
import express from 'express';
import routes from './routes';
import cron from './crons';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

routes(app);
cron(app);

export default app;