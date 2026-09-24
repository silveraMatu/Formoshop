import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { BaseError } from '../customErrors/custom.ts';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation Error',
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
        code: issue.code,
      })),
    });
  }

  if(err instanceof BaseError){
    return res.status(err.statusCode).json({
        status:"fail",
        status_code: err.statusCode,
        message: err.message
    })
  }

  console.log(err)
  res.status(500).json({
    status: "fail",
    status_code: 500,
    message: "Error interno del servidor"
  })
};
