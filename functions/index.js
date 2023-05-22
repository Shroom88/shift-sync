/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors", {
  origin: true,
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  cors()(req, res, () => {
    logger.info("Hello logs!", { structuredData: true });
    console.log(request);
    response.send("Hello from Firebase!");
  });
});