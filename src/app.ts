import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'strong-error-handler';
import { healthCheck } from './routes/healthCheck';
import * as helmet from 'helmet';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from './utils/environmentVariables';

export const app = express();

function authenticateToken(request: express.Request, response: express.Response, next: express.NextFunction) {
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (token == null) {
    return response.sendStatus(401);
  }
  return jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return response.sendStatus(403);
    }
    return next();
  });
}

app.use(helmet());

app.use(authenticateToken);

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for json body parsing
app.use(bodyParser.json({ limit: '5mb' }));

// enable corse for all origins
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Expose-Headers', 'x-total-count');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');

//   next();
// });

app.use('/healthCheck', healthCheck);

app.use(
  errorhandler({
    debug: process.env.ENV !== 'prod',
    log: true,
  }),
);
