const db = require("../models/index.js");
const Course = db.course;

// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date || !req.body.note || !req.body.prix || !req.body.origin || !req.body.destination || !req.body.etat || !req.body.taxiId || !req.body.taximanId || !req.body.clientId) {
    res.status(400).send({
      message: "Certains champs de la course sont vides ou manquants."
    });
    return;
  }

  // Create a Course
  const course = {
    date: req.body.date,
    note: req.body.note,
    prix: req.body.prix,
    origin: req.body.origin,
    destination: req.body.destination,
    etat: req.body.etat,
    taxiId: req.body.taxiId,
    taximanId: req.body.taximanId,
    clientId: req.body.clientId
  };

  // Save Course in the database
  Course.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création de la course."
      });
    });
};

// Retrieve all Courses
exports.findAll = (req, res) => {
  Course.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des courses."
      });
    });
};

// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver la course avec l'identifiant ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération de la course avec l'identifiant " + id
      });
    });
};

// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Course.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La course a été mise à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour la course avec l'identifiant ${id}. La course n'a pas été trouvée ou req.body est vide !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour de la course avec l'identifiant " + id
      });
    });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La course a été supprimée avec succès ! "});
      } else {
        res.send({
          message: `Impossible de supprimer la course avec l'identifiant ${id}. La course n'a pas été trouvée !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer la course avec l'identifiant " + id
      });
    });
};

// Retrieve Courses by Client
exports.findByClient = (req, res) => {
  const clientId = req.params.clientId;

  Course.findAll({
    where: { clientId: clientId }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération des courses pour le client avec l'identifiant " + clientId
      });
    });
};

// Retrieve Courses by Taximan
exports.findByTaximan = (req, res) => {
  const taximanId = req.params.taximanId;

  Course.findAll({
    where: { taximanId: taximanId }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération des courses pour le taximan avec l'identifiant " + taximanId
      });
    });
};

// Retrieve Courses by Taxi
exports.findByTaxi = (req, res) => {
  const taxiId = req.params.taxiId;

  Course.findAll({
    where: { taxiId: taxiId }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération des courses pour le taxi avec l'identifiant " + taxiId
      });
    });
};

module.exports = exports;
