import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['fsdjkfh65783487sdfsfajlhksd'] }));
app.use(router);

app.listen(3000, (): void => {
  console.log('Server is listening on port 3000');
});
