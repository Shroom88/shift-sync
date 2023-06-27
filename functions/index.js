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

exports.deleteTrigger = functions.database
  .ref("/users")
  .onDelete((snapshot, context) => {
    const deletedData = snapshot.val();
    // Perform actions or cleanup based on the deleted data
    // You can also access context.params.nodeId to get the deleted node's ID

    // Example: Delete a related node
    const relatedNodeRef = admin.database().ref("/path/to/related/node");
    relatedNodeRef.remove();

    return null; // Important: Must return null or a promise
  });
