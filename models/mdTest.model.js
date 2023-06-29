module.exports = function(sequelize, Sequelize) {
  const MdTest = sequelize.define("md_test", {
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    dateNaissance: {
      type: Sequelize.DATE
    },
    lieuNaissance: {
      type: Sequelize.STRING
    },
    adresse: {
      type: Sequelize.STRING
    }
  });

  return MdTest;
};


  /*
After initializing Sequelize, we don’t need to write CRUD functions, Sequelize supports all of them:

create a new MdTest: create(object)
find a MdTest by id: findByPk(id)
get all MdTests: findAll()
update a MdTest by id: update(data, where: { id: id })
remove a MdTest: destroy(where: { id: id })
remove all MdTests: destroy(where: {})
find all MdTests by title: findAll({ where: { title: ... } })
  */
  