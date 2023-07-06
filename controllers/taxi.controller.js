// const TaximanModel = require("../models/Taximan.model.js");
const db = require("../models/index.js")
const Taxi = db.taxi;
const Taximan = db.taximan
// Create and Save a new Taxi
exports.create = (req, res) => {
  // Validate request
  if (!req.body.model || !req.body.numImmatriculation || !req.body.nbrePlace) {
    res.status(400).send({
      message: "Les champs model, numImmatriculation et nbrePlace ne peuvent pas être vides."
    });
    return;
  }

  // Create a Taxi
  const taxi = {
    model: req.body.model,
    numImmatriculation: req.body.numImmatriculation,
    nbrePlace: req.body.nbrePlace,
    taximanId : req.body.taximanId
  };

  // Save Taxi in the database
  Taxi.create(taxi)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du taxi."
      });
    });
};

// Retrieve all Taxis from the database
exports.findAll = (req, res) => {
  Taxi.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des taxis."
      });
    });
};

// Find a single Taxi with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("dougg nagn ci fonction")


  Taxi.findByPk(id, {
    include: {
      model: Taximan,
      as : "taximan",
    }})
    .then(data => {
      if (data) {
        res.send(data.toJSON());
      } else {
        res.status(404).send({
          message: `Impossible de trouver le taxi avec l'identifiant ${id}.`
        });
      }
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).send({
        message: "Erreur lors de la récupération du taxi avec l'identifiant " + id
      });
    });
};

// Find a Taxi by Taximan
exports.findByTaximan = (req, res) => {
    const taximanId = req.params.taximanId;
  
    Taxi.findAll({
      where: { taximanId: taximanId }
    })
    .then(data => {
    if (data) {
        res.send(data)
    } else {
        res.status(404).send({
        message: `Impossible de trouver un taxi pour le taximan avec l'identifiant ${taximanId}.`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Erreur lors de la récupération du taxi pour le taximan avec l'identifiant " + taximanId
    });
    });
};
  

// Update a Taxi by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Taxi.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le taxi a été mis à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour le taxi avec l'identifiant ${id}. Le taxi n'a pas été trouvé ou req.body est vide !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour du taxi avec l'identifiant " + id
      });
    });
};

// Delete a Taxi with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Taxi.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le taxi a été supprimé avec succès !"
        });
      } else {
        res.send({
          message: `Impossible de supprimer le taxi avec l'identifiant ${id}. Le taxi n'a pas été trouvé !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le taxi avec l'identifiant " + id
      });
    });
};
