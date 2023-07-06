const { DB, USER, PASSWORD, HOST, dialect: _dialect, pool: _pool } = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  operatorsAliases: false,
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const client = require('./client.model.js')(sequelize);
const taxi = require('./Taxi.model.js')(sequelize);
const taximan = require('./Taximan.model.js')(sequelize);
const course = require('./course.model.js')(sequelize);

taxi.belongsTo(taximan, { foreignKey: 'taximanId', as: 'taximan' });
taximan.hasMany(taxi, { foreignKey: 'taximanId', as: 'taxis' });


db.client = client
db.taxi = taxi;
db.taximan = taximan;
db.course = course;

// Définir les associations entre les modèles


client.hasMany(course, { foreignKey: 'clientId', as: 'client' });
course.belongsTo(client, { foreignKey: 'clientId', as: 'client' });

taxi.hasMany(course, { foreignKey: 'taxiId', as: 'taxi' });
course.belongsTo(taxi, { foreignKey: 'taxiId', as: 'taxi' });

taximan.hasMany(course, { foreignKey: 'taximanId', as: 'taximan' });
course.belongsTo(taximan, { foreignKey: 'taximanId', as: 'taximan' });

// Synchronisation forcée des modèles avec la base de données
db.sequelize.sync()
  .then(() => {
    console.log('Synchronisation réussie.');
    // Votre code ici une fois que la synchronisation est terminée
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation :', error);
    // Gérer les erreurs de synchronisation ici
  });

  
module.exports = db;
