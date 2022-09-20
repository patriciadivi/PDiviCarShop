import express from 'express';
import 'express-async-errors';
import routes from './routes';

import globalError from './helpers/globalError';

const app = express();
app.use(express.json());
app.use(routes);
app.use(globalError.handle);

export default app;
