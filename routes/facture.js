const Facture = require("../models/Facture");

// Contrôleur pour récupérer toutes les factures
exports.getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.findAll();
    res.status(200).json(factures);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération de toutes les factures",
    });
  }
};

// Contrôleur pour créer une facture
exports.createFacture = async (req, res) => {
  const { date_prestation, prix_total, id_client } = req.body;
  try {
    const newFacture = await Facture.create({
      date_prestation,
      prix_total,
      id_client,
    });
    res.status(201).json(newFacture);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la facture" });
  }
};

// Contrôleur pour récupérer une facture par son ID
exports.getFactureById = async (req, res) => {
  const id = req.params.id;
  try {
    const facture = await Facture.findByPk(id);
    if (facture === null) {
      res.status(400).json({ message: "La facture n'a pas été trouvée." });
    } else {
      res.status(200).json(facture);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la facture" });
  }
};

// Contrôleur pour mettre à jour une facture par son ID
exports.updateFactureById = async (req, res) => {
  const id = req.params.id;
  const { date_prestation, prix_total, id_client } = req.body;
  try {
    const facture = await Facture.findByPk(id);
    if (facture === null) {
      res.status(400).json({ message: "La facture n'a pas été trouvée." });
    } else {
      await Facture.update(
        { date_prestation, prix_total, id_client },
        { where: { id } }
      );
      res.status(200).json({ message: "La facture a été mise à jour." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la facture" });
  }
};
