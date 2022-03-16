import validator from "email-validator";
import databasePool from "../../shared/database.js";
import ApiError from "../exceptions/api.error.js";

export async function valideteEmail(email) {
  if (!validator.validate(email)) {
    throw ApiError.badRequest(ApiError.errorMessages.INVALID_EMAIL);
  }

  const queryString = `SELECT * FROM users WHERE email="${email}"`;
  const candidate = await databasePool.query(queryString);

  if (candidate[0].length > 0) {
    throw ApiError.badRequest(ApiError.errorMessages.USER_ALREADY_EXISTS);
  }
}

export function validetePassword(password) {
  if (!password) {
    throw ApiError.badRequest(ApiError.errorMessages.MISSING_PASSWORD);
  }

  if (password.length < 6) {
    throw ApiError.badRequest(ApiError.errorMessages.SHORT_PASSWORD);
  }

  if (password.length > 50) {
    throw ApiError.badRequest(ApiError.errorMessages.TOO_LONG_PASSWORD);
  }
}
