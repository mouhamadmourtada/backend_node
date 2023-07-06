const { DataTypes, Model } = require('sequelize');

class Course extends Model {}

module.exports = (sequelize) => {
  Course.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      prix: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      etat: {
        type: DataTypes.ENUM('en_route', 'en_cours', 'termine', 'annule'),
        allowNull: false
      },
      dateDeEnRoute: {
        type: DataTypes.DATE,
        allowNull: true
      },
      dateDeEnCours: {
        type: DataTypes.DATE,
        allowNull: true
      },
      dateDeTermine: {
        type: DataTypes.DATE,
        allowNull: true
      },
      dateDeAnnule: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Course'
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.Taxi, { foreignKey: 'taxiId' });
    Course.belongsTo(models.Taximan, { foreignKey: 'taximanId' });
    Course.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return Course;
};
