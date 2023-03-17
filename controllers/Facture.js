// Import Express.js and Facture model
const express = require("express");
const Facture = require("../models/Facture");

// Crée une instance de l'objet Router d'Express
const router = express.Router();

// Définit la route pour récupérer toutes les factures
router.get("/factures", async (req, res) => {
  try {
    // Récupère toutes les factures de la bdd
    const factures = await Facture.find();
    // Renvoie les factures récupérées en tant que réponse JSON
    res.json(factures);
  } catch (err) {
    // Gère les erreurs éventuelles
    res.status(500).json({ message: err.message });
  }
});

router.get("/factures/:id", async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);
    res.json(facture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/factures", async (req, res) => {
  const facture = new Facture({
    date_restation: req.body.datePrestation,
    prix_total: req.body.prix_total,
  });
  try {
    const newFacture = await facture.save();
    res.status(201).json(newFacture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/factures/:id", async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);
    if (req.body.date_prestation != null) {
      facture.date_prestation = req.body.date_prestation;
    }
    if (req.body.prix_total != null) {
      facture.prix_total = req.body.prix_total;
    }
    const updatedFacture = await facture.save();
    res.json(updatedFacture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/factures/:id", async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);
    await facture.remove();
    res.json({ message: "Facture supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
