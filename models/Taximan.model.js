const { DataTypes } = require('sequelize');
const Taxi = require("./Taxi.model")

module.exports = (sequelize) => {
  const Taximan = sequelize.define(
    'Taximan',
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      adresse: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numTel: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      modelName: 'Taximan'
    }
  );


  return Taximan;
};


