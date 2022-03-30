import validator from "email-validator";
import databasePool from "../../shared/database.js";
import ApiError from "../exceptions/api.error.js";
export default class Validator {
  static async valideteEmail(email) {
    if (!validator.validate(email)) {
      throw ApiError.badRequest(ApiError.errorMessages.INVALID_EMAIL);
    }

    const queryString = `SELECT * FROM users WHERE email="${email}"`;
    const candidate = await databasePool.query(queryString);

    if (candidate[0].length > 0) {
      throw ApiError.badRequest(ApiError.errorMessages.USER_ALREADY_EXISTS);
    }
  }

  static validetePassword(password) {
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

  static validateFirstName(firstName) {
    if (!firstName) {
      throw ApiError.badRequest(ApiError.errorMessages.MISSING_FIRST_NAME);
    }

    if (firstName.length < 2) {
      throw ApiError.badRequest(ApiError.errorMessages.SHORT_FIRST_NAME);
    }

    if (firstName.length > 30) {
      throw ApiError.badRequest(ApiError.errorMessages.LONG_FIRST_NAME);
    }
  }

  static validateLastName(lastName) {
    if (!lastName) {
      throw ApiError.badRequest(ApiError.errorMessages.MISSING_LAST_NAME);
    }

    if (lastName.length < 2) {
      throw ApiError.badRequest(ApiError.errorMessages.SHORT_LAST_NAME);
    }

    if (lastName.length > 30) {
      throw ApiError.badRequest(ApiError.errorMessages.LONG_LAST_NAME);
    }
  }

  static async validateUserData(firstName, lastName, email, password) {
    Validator.validateFirstName(firstName);
    Validator.validateLastName(lastName);
    await Validator.valideteEmail(email);
    Validator.validetePassword(password);
  }
}
