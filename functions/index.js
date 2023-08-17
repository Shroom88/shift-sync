/* eslint-disable */

const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

const sendgridApiKey = functions.config().sendgrid.api_key;
const sendgridEmail = functions.config().sendgrid.email;

sgMail.setApiKey(sendgridApiKey);

exports.sendEmail = functions.https.onCall(async (data, context) => {
  const { to, subject, text } = data;

  const msg = {
    to,
    from: sendgridEmail,
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
