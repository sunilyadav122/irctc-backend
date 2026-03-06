class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message, code = "BAD_REQUEST") {
    super(message, 400, code);
  }
}

class NotFoundError extends AppError {
  constructor(message, code = "NOT_FOUND") {
    super(message, 404, code);
  }
}

class UnauthorizedError extends AppError {
  constructor(message, code = "UNAUTHORIZED") {
    super(message, 401, code);
  }
}

class ForbiddenError extends AppError {
  constructor(message, code = "FORBIDDEN") {
    super(message, 403, code);
  }
}

class ConflictError extends AppError {
  constructor(message, code = "CONFLICT") {
    super(message, 409, code);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
};
