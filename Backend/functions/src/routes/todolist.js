const express = require("express");
const { db } = require("../firebaseService");
const router = express.Router();

router.get("/", async (req, res) => {
  const { userId } = req.query; // Obtener el userId desde la query string

  if (!userId) {
    return res.status(400).send({ error: "El userId es requerido" });
  }

  try {
    console.log(`Obteniendo tareas para el usuario: ${userId}`);

    // Filtrar las tareas en Firestore por userId
    const snapshot = await db
      .collection("todolist")
      .where("userId", "==", userId)
      .get();

    if (snapshot.empty) {
      console.log("No hay tareas para este usuario");
      return res.status(200).send([]);
    }

    const todolist = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(todolist);
  } catch (error) {
    console.error("Error al obtener la lista de tareas:", error);
    res.status(500).send({ error: "Error al obtener la lista de tareas" });
  }
});

// POST /todolist - Crear una nueva tarea
router.post("/", async (req, res) => {
  const { title, description, creationDate, completed, userId } = req.body;

  try {
    const newTask = { title, description, creationDate, completed, userId };
    const taskRef = await db.collection("todolist").add(newTask);
    res.status(201).send({ id: taskRef.id });
  } catch (error) {
    res.status(500).send({ error: "Error al crear la tarea" });
  }
});

// PUT /todolist/:taskId - Actualizar una tarea
router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const updatedTask = req.body;

  try {
    await db.collection("todolist").doc(taskId).update(updatedTask);
    res.status(200).send({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar la tarea" });
  }
});

// DELETE /todolist/:taskId - Eliminar una tarea
router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    await db.collection("todolist").doc(taskId).delete();
    res.status(200).send({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar la tarea" });
  }
});

module.exports = router;
