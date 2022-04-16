export default class ApiError extends Error {
  status;
  error;

  static auth_errors = {
    name_errors: {
      MISSING_NAME: "MISSING_NAME",
      SHORT_NAME: "SHORT_NAME",
      LONG_NAME: "LONG_NAME",
    },
    email_errors: {
      INVALID_EMAIL: "INVALID_EMAIL",
      USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
      USER_DOES_NOT_EXIST: "USER_DOES_NOT_EXIST",
    },
    password_errors: {
      WRONG_PASSWORD: "WRONG_PASSWORD",
      MISSING_PASSWORD: "MISSING_PASSWORD",
      SHORT_PASSWORD: "SHORT_PASSWORD",
      TOO_LONG_PASSWORD: "TOO_LONG_PASSWORD",
      PASSWORDS_DO_NOT_MATCH: "PASSWORDS_DO_NOT_MATCH",
      NOT_A_STRONG_PASSWORD: "NOT_A_STRONG_PASSWORD",
    },
    phone_errors: {
      MISSING_PHONE_NUMBER: "MISSING_PHONE_NUMBER",
      WRONG_PHONE_NUMBER: "WRONG_PHONE_NUMBER",
    },
    type_errors: {
      NOT_SPECIFIED_TYPE: "NOT_SPECIFIED_TYPE",
    },
    region_errors: {
      NO_REGION: "NO_REGION",
      INCORRECT_REGION: "INCORRECT_REGION",
    },
    settlement_errors: {
      NO_SETTLEMENT: "NO_SETTLEMENT",
      INCORRECT_SETTLEMENT: "INCORRECT_SETTLEMENT",
    },
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
