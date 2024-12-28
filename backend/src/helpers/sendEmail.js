const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const OAuth2 = google.auth.OAuth2;
const OAuthClient = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

OAuthClient.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendEmail = async (
  subject,
  send_to,
  send_from,
  reply_to,
  template,
  name,
  link
) => {
  try {
    // Obtenez le token d'accès
    const accessToken = await OAuthClient.getAccessToken();

    // Créez le transporteur Nodemailer
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Configurez Handlebars pour Nodemailer
    const { default: hbs } = await import("nodemailer-express-handlebars");
    const handlebarsOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "../views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "../views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarsOptions));

    // Définissez les options de l'e-mail
    const mailOptions = {
      from: send_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      template: template,
      context: {
        name: name,
        link: link,
      },
    };

    // Envoyez l'e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

module.exports = sendEmail;
