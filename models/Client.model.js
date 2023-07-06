const { DataTypes, Model } = require('sequelize');

class Client extends Model {}

module.exports = (sequelize) => {
  Client.init(
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
      nbre: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Client'
    }
  );

  return Client;
};


