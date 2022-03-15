import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link, user) {
    const result = await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активація акаунту на ${process.env.HOST}`,
      text: "",
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <h2 style="text-align: center;">
          Привіт ${user}
        </h2>
        <div style="display: flex; flex-direction: column;">
          <p style="text-align: center;">
            Для того щоб активувати акаунт натисніть на кнопку нижче:
          </p>
          <a
            style="
              font-weight: 500;
              margin: 5px auto;
              padding: 10px 15px;
              background-color: cadetblue;
              border-radius: 5px;
              text-decoration: none;
              color: white;
            "
            href="${link}"
          >
            Активувати акаунт
          </a>
        </div>
     </div>
      `,
    });

    return result;
  }
}

export default new EmailService();
