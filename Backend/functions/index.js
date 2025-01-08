const functions = require("firebase-functions");
const app = require("./src/app");

// Exportar la API como Cloud Function
exports.api = functions.https.onRequest(app);
