const express = require("express");const { admin } = require("../firebaseService");
const router = express.Router();

// Login con correo y contraseña
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    res.status(200).send({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res
      .status(400)
      .send({ error: "Usuario no encontrado o contraseña incorrecta" });
  }
});

// Login con Google/Facebook
router.post("/social-login", async (req, res) => {
  const { token } = req.body; // Token enviado desde el cliente
  console.log(token);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    res.status(200).send({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Token inválido" });
  }
});

router.post("/register", async (req, res) => {
  const { email, displayName } = req.body;

  if (!email) {
    return res.status(400).send({ error: "El correo es requerido" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      displayName,
    });

    res.status(201).send({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    if (error.code === "auth/email-already-exists") {
      return res.status(400).send({ error: "El correo ya está registrado" });
    }
    res.status(500).send({ error: "Error al crear el usuario" });
  }
});
module.exports = router;
