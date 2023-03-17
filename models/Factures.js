const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/facture-lucie"
);

const Facture = sequelize.define(
  "Facture",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    datePrestation: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    prix_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Facture",
    timestamps: false,
  }
);

Facture.belongsTo(User, { foreignKey: "id_user" });

module.exports = Facture;
