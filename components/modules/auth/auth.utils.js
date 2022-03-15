import validator from "email-validator";
import databasePool from "../../shared/database.js";
import ERROR_CODES from "../../shared/error_codes.js";

export async function valideteEmail(email) {
  if (!validator.validate(email)) {
    throw new Error(ERROR_CODES.INVALID_EMAIL);
  }

  const queryString = `SELECT * FROM users WHERE email="${email}"`;
  const candidate = await databasePool.query(queryString);

  if (candidate[0].length > 0) {
    throw new Error(ERROR_CODES.USER_ALREADY_EXISTS);
  }
}

export function validetePassword(password) {
  if (!password) {
    throw new Error(ERROR_CODES.MISSING_PASSWORD);
  }

  if (password.length < 6) {
    throw new Error(ERROR_CODES.SHORT_PASSWORD);
  }

  if (password.length > 50) {
    throw new Error(ERROR_CODES.TOO_LONG_PASSWORD);
  }
}
