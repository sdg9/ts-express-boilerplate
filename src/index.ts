import './utils/env';
import { createServer } from 'http';
import { app } from './app';
import logger from './utils/logger';
import { PORT } from './utils/environmentVariables';

createServer(app).listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
