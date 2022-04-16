import validator from "validator";
import databasePool from "../../shared/database.js";
import ApiError from "../exceptions/api.error.js";
export default class Validator {
  static async valideteEmail(user, errors) {
    const { email } = user;
    const queryString = `SELECT * FROM user WHERE email="${email}"`;
    const candidate = await databasePool.query(queryString);

    if (candidate[0].length > 0)
      errors.push(ApiError.auth_errors.email_errors.USER_ALREADY_EXISTS);
  }

  static validateUserType(user, errors) {
    const userTypes = {
      customer: "customer",
      provider: "provider",
    };

    if (!userTypes[user.type]) {
      errors.push("NOT_SPECIFIED_TYPE");
    }

    return errors;
  }

  static async validateAuthData(user, errors) {
    if (!validator.isEmail(user.email)) errors.push("INVALID_EMAIL");
    if (user.password !== user.password_confirmation)
      errors.push("PASSWORDS_DO_NOT_MATCH");
    if (user.password.length < 8) errors.push("SHORT_PASSWORD");
    if (user.password.length > 30) errors.push("TOO_LONG_PASSWORD");
    if (!validator.isStrongPassword(user.password))
      errors.push("NOT_A_STRONG_PASSWORD");

    return errors;
  }

  static validateContactData(user, errors) {
    if (!user.firstName || !user.lastName) errors.push("MISSING_NAME");
    if (user.firstName.length < 2 || user.lastName.length < 2)
      errors.push("SHORT_NAME");
    if (user.firstName.length > 30 || user.lastName.length > 30)
      errors.push("LONG_NAME");
    if (!user.phoneNumber) errors.push("MISSING_PHONE_NUMBER");
    if (!validator.isMobilePhone(user.phoneNumber))
      errors.push("WRONG_PHONE_NUMBER");

    return errors;
  }

  static validateAddress(user, errors) {
    if (!user.region) errors.push("NO_REGION");
    if (!user.settlement) errors.push("NO_SETTLEMENT");
    if (!validator.isAlpha(user.region, "uk-UA", { ignore: " -" }))
      errors.push("INCORRECT_REGION");
    if (!validator.isAlpha(user.settlement, "uk-UA", { ignore: " -" }))
      errors.push("INCORRECT_SETTLEMENT");

    return errors;
  }

  static async validateUserData(user) {
    const errors = [];
    Validator.validateUserType(user, errors);
    Validator.validateAuthData(user, errors);
    Validator.validateContactData(user, errors);
    // Validator.validateAddress(user, errors);
    await Validator.valideteEmail(user, errors);

    if (errors.length > 0)
      throw ApiError.badRequest("NOT_CORRECT_USER_DATA", errors);
  }
}
