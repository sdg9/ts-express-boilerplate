import { Router } from 'express';
import logger from '../utils/logger';

export const healthCheck = Router();

healthCheck.get('/', async (req, res, next) => {
  logger.info('Is endpoint healthy?');
  try {
    res.status(200).json({ healthy: true });
  } catch (err) {
    next(err);
  }
});
