const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route pour récupérer tous les utilisateurs
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  User.findAll()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route pour créer un utilisateur
router.post("/users", async (req, res) => {
  try {
    const { nom, prenom, adress, ville, codepostal, telephone, mail } =
      req.body;
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour récupérer un utilisateur spécifique
router.get("/users/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Route pour mettre à jour un utilisateur spécifique
router.patch("/users/:id", getUser, async (req, res) => {
  try {
    const { nom, prenom, adress, ville, codepostal, telephone, mail } =
      req.body;
    await res.user.update({
      nom,
      prenom,
      adress,
      ville,
      codepostal,
      telephone,
      mail,
    });
    res.json(res.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour supprimer un utilisateur spécifique
router.delete("/users/:id", getUser, async (req, res) => {
  try {
    await res.user.destroy();
    res.json({ message: "Utilisateur supprimé" });
  } catch {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour récupérer un utilisateur spécifique
async function getUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
