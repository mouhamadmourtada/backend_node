const db = require("../models/index.js");
const Taximan = db.taximan;
const Taxi = db.taxi;

// Ajouter un taximan
exports.create = (req, res) => {
  // Valider la requête
  if (!req.body.nom || !req.body.prenom || 
    !req.body.mail || !req.body.adresse || 
    !req.body.login || !req.body.password) {
    res.status(400).send({
      message: "Tous les champs doivent être renseignés."
    });
    return;
  }

  // Créer un taximan
  const taximan = {
    login : req.body.login,
    password : req.body.password,
    nom: req.body.nom,
    adresse : req.body.adresse,
    prenom: req.body.prenom,
    mail: req.body.mail,
    numTel: req.body.numTel,
    taxiId: req.body.taxiId || null // Utiliser null si taxiId n'est pas fourni
  };

  // Enregistrer le taximan dans la base de données
  Taximan.create(taximan)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création du taximan."
      });
    });
};


// Retrieve all Taximen from the database
exports.findAll = (req, res) => {
  Taximan.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des taximen."
      });
    });
};

// Find a single Taximan with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Taximan.findByPk(id)    
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver le taximan avec l'identifiant ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération du taximan avec l'identifiant " + id
      });
    });
};

// Update a Taximan by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Taximan.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le taximan a été mis à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour le taximan avec l'identifiant ${id}. Le taximan n'a pas été trouvé ou req.body est vide !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour du taximan avec l'identifiant " + id
      });
    });
};

// Delete a Taximan with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Taximan.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le taximan a été supprimé avec succès !"
        });
      } else {
        res.send({
          message: `Impossible de supprimer le taximan avec l'identifiant ${id}. Le taximan n'a pas été trouvé !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le taximan avec l'identifiant " + id
      });
    });
};
