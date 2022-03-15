import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import databasePool from "../../shared/database.js";

dotenv.config();

class TokenService {
  genetateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const findUserByIdQuery = `SELECT * FROM tokens WHERE user_id = ${userId}`;
    const tokenData = await databasePool.query(findUserByIdQuery);
    if (tokenData[0][0]) {
      const updateTokenQuery = `UPDATE tokens SET token = ${refreshToken} WHERE user_id = ${userId}`;
      const result = await databasePool.query(updateTokenQuery);
      return result;
    }

    const createTokenQuery = `INSERT INTO tokens VALUES (${userId}, "${refreshToken}")`;
    const result = await databasePool.query(createTokenQuery);
    return result;
  }
}

export default new TokenService();
