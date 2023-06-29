const db = require("../models/index.js");
const MdTest = db.tutorials;
const { Op } = db.Sequelize;

// Create and Save a new Mdtest
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Mdtest
  const mdTest = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    dateNaissance: req.body.dateNaissance,
    lieuNaissance: req.body.lieuNaissance,
    adresse: req.body.adresse
  };

  // Save Mdtest in the database
  MdTest.create(mdTest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the mdTest."
      });
    });
};

// Retrieve all Mdtests from the database.
exports.findAll = (req, res) => {
  // let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  // Tutorial.findAll({ where: condition })
  MdTest.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mdTest."
      });
    });
};

// Find a single MdTest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MdTest.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find mdTest with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving MdTest with id=" + id
      });
    });
};

// Update a MdTest by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  MdTest.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "MdTest was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update MdTest with id=${id}. Maybe MdTest was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating MdTest with id=" + id
      });
    });
};

// Delete a MdTest with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  MdTest.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "MdTest was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete MdTest with id=${id}. Maybe MdTest was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete MdTest with id=" + id
      });
    });
};

// Delete all mdTest from the database.
exports.deleteAll = (req, res) => {
  MdTest.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} MdTest were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all MdTest."
      });
    });
};

// Find all published mdTest
exports.findAllPublished = (req, res) => {
  MdTest.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mdTest."
      });
    });
};
