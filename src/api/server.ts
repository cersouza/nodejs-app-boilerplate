import express from 'express';
import Helpers from '../helpers/functions';
import ErrorsHandlingMiddleware from './middlewares/ErrorsHandlingMiddleware';
import routes from './routes';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    message: 'Server status ok!',
  });
});

app.use(routes);

app.use(ErrorsHandlingMiddleware);

if (Helpers.isTestingEnvironment()) {
  app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
  });
}

export default app;
