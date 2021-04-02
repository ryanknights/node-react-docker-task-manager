import cors from 'cors';
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

routes(app);

export default app;