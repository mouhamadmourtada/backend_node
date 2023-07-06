const db = require("../models/index.js");
const Client = db.client;

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom || !req.body.prenom || !req.body.mail || 
    !req.body.adresse || !req.body.login || 
    !req.body.password) {
    res.status(400).send({
      message: "Les champs nom, prénom, mail, adresse et nbre ne peuvent pas être vides."
    });
    return;
  }

  // Create a Client
  const client = {
    login: req.body.login,
    password: req.body.password,
    nom: req.body.nom,
    prenom: req.body.prenom,
    mail: req.body.mail,
    adresse: req.body.adresse,
    nbre: 0,
  };

  // Save Client in the database
  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du client."
      });
    });
};

// Retrieve all Clients from the database
exports.findAll = (req, res) => {
  Client.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des clients."
      });
    });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver le client avec l'identifiant ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération du client avec l'identifiant " + id
      });
    });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Client.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le client a été mis à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour le client avec l'identifiant ${id}. Le client n'a pas été trouvé ou req.body est vide !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour du client avec l'identifiant " + id
      });
    });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Client.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le client a été supprimé avec succès !"
        });
      } else {
        res.send({
          message: `Impossible de supprimer le client avec l'identifiant ${id}. Le client n'a pas été trouvé !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le client avec l'identifiant " + id
      });
    });
};

// Delete all Clients from the database
exports.deleteAll = (req, res) => {
  Client.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} clients ont été supprimés avec succès !` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de tous les clients."
      });
    });
};
