require("dotenv").config();
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

if (process.env.FIRESTORE_EMULATOR_HOST) {
  //se utiliza solo si es local
  console.log(process.env.FIRESTORE_EMULATOR_HOST);
  console.log("Conectando al Firestore Emulator...");
  db.settings({ host: process.env.FIRESTORE_EMULATOR_HOST, ssl: false });
}

module.exports = { admin, db };
