import { NextFunction, Request, Response } from 'express';

import { DomainError } from '../../core/domain/errors/domain.error';

export function domainErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof DomainError) {
    res.status(400).json({
      status: 'Error',
      message: err.message,
    });
  }

  next(err);
}
