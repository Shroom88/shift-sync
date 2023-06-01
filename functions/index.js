/* eslint-disable */

const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.REACT_APP_SEND_GRID_API_KEY);

exports.sendEmail = functions.https.onCall(async (data, context) => {
  const { to, subject, text } = data;

  const msg = {
    to,
    from: process.env.REACT_APP_GOOGLE_SENDER_EMAIL,
    subject,
    text,
  };

  return sgMail
    .send(msg)
    .then(() => {
      return { message: "Email sent successfully" };
    })
    .catch((error) => {
      throw new functions.https.HttpsError(
        "internal",
        "Email sending failed",
        error
      );
    });
});
