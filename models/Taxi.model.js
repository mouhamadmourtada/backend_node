const { DataTypes } = require('sequelize');
const Taximan = require("./Taximan.model")

module.exports = (sequelize) => {
  const Taxi = sequelize.define(
    'Taxi',
    {
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numImmatriculation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nbrePlace: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'Taxi'
    }
  );


  return Taxi;
};



