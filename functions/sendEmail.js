const { google } = require("googleapis");
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./shift-sync-firebase-adminsdk-n6bax-37dd3ffb8d.json");

// Gmail API credentials
const gmailCredentials = {
  clientId:
    "895677340254-djdi0sf234ugjfjmn68el0kqks76hir0.apps.googleusercontent.com",
  clientSecret: "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",
  redirectUri: "http://localhost:3000/",
};

// Firebase Admin initialization
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Google OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  gmailCredentials.clientId,
  gmailCredentials.clientSecret,
  gmailCredentials.redirectUri
);

// Function to send an email using Gmail API
async function sendEmail(to, subject, message) {
  try {
    // Get access token from Firebase
    const customToken = await firebaseAdmin
      .auth()
      .createCustomToken("dummyUID");
    const token = await oAuth2Client.getToken(customToken);
    oAuth2Client.setCredentials(token.tokens);

    // Send email using Gmail API
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const email = {
      requestBody: {
        raw: `RnJvbSBhIG51bWJlciBvZiBlbWFpbCBhZGRy${Buffer.from(
          message
        ).toString("base64")}`,
        // Base64 encode the email content
        // You can use Buffer.from(message).toString('base64') to encode the message
        payload: {
          headers: {
            To: to,
            Subject: subject,
          },
        },
      },
      userId: "me",
    };

    const res = await gmail.users.messages.send(email);
    console.log("Email sent successfully!", res.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
