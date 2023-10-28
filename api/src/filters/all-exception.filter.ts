import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

interface ErrorResponse {
  message: string;
  status: number;
}

enum PostgresErrorCode {
  UniqueViolation = '23505',
  CheckViolation = '23514',
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503',
}

export class AllExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    let errorResponse: ErrorResponse;
    const message = exception?.response?.message || exception?.message;

    if (exception instanceof HttpException) {
      errorResponse = { status: exception.getStatus(), message };
    } else if (exception instanceof QueryFailedError) {
      errorResponse = this.handleQueryException(exception);
    } else {
      errorResponse = { message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }

    res.status(errorResponse.status).json({
      statusCode: errorResponse.status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: errorResponse.message,
    });
  }

  private handleQueryException(exception: any): ErrorResponse {
    const status = HttpStatus.UNPROCESSABLE_ENTITY;
    const code = (exception as any).code;
    const field = this.extractFieldName(exception.driverError.detail);
    let message: string = (exception as QueryFailedError).message;

    switch (code) {
      case PostgresErrorCode.UniqueViolation:
        message = `${field} already exists`;
        break;
      case PostgresErrorCode.NotNullViolation:
        message = `${field} is required`;
        break;
    }

    return { status, message };
  }

  private extractFieldName(detail: string): string {
    const result = /Key \((.*?)\)=/.exec(detail);
    return result?.[1] ?? 'Field';
  }
}
