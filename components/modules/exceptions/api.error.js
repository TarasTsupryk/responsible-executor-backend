export default class ApiError extends Error {
  status;
  error;

  static errorMessages = {
    INVALID_EMAIL: "INVALID_EMAIL",
    USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
    MISSING_PASSWORD: "MISSING_PASSWORD",
    SHORT_PASSWORD: "SHORT_PASSWORD",
    TOO_LONG_PASSWORD: "TOO_LONG_PASSWORD",
    USER_DOES_NOT_EXIST: "USER_DOES_NOT_EXIST",
    WRONG_PASSWORD: "WRONG_PASSWORD",
    MISSING_FIRST_NAME: "MISSING_FIRST_NAME",
    SHORT_FIRST_NAME: "SHORT_FIRST_NAME",
    LONG_FIRST_NAME: "LONG_FIRST_NAME",
    MISSING_LAST_NAME: "MISSING_LAST_NAME",
    SHORT_LAST_NAME: "SHORT_LAST_NAME",
    LONG_LAST_NAME: "LONG_LAST_NAME",
  };

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorizedUser() {
    return new ApiError(401, "UNAUTHORIZED_USER");
  }

  static badRequest(message, errors) {
    return new ApiError(400, message, errors);
  }
}
