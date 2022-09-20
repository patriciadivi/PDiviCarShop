import { Request, Response, NextFunction } from 'express';
import { CustomerError } from './customerError';

class GlobalError {
  // eslint-disable-next-line class-methods-use-this
  public handle(error: CustomerError, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof CustomerError) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: `>>>> ${error}` });
  }
}

export default new GlobalError();