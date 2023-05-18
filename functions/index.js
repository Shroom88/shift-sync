const functions = require("firebase-functions");
const sendEmail = require("./sendEmail");
const cors = require("cors");

// Configure CORS options
const corsOptions = {
  origin: true,
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
};

// Define Firebase Cloud Function
exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(corsOptions)(req, res, () => {
    // Get email parameters from the request body
    const { to, subject, message } = req.body;

    // Call the sendEmail function
    sendEmail(to, subject, message)
      .then(() => {
        // Send success response
        res.status(200).send("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);

        // Send error response
        res.status(500).send("Error sending email");
      });
  });
});
