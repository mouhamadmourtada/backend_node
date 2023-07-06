module.exports = (app) => {
    const client = require("../controllers/client.controller.js");
  
    const express = require("express");
    const router = express.Router();
  
    // Create a new Client
    router.post("/", client.create);
  
    // Retrieve all Clients
    router.get("/", client.findAll);
  
    // Retrieve a single Client with id
    router.get("/:id", client.findOne);
  
    // Update a Client with id
    router.put("/:id", client.update);
  
    // Delete a Client with id
    router.delete("/:id", client.delete);
  
    // Delete all Clients
    router.delete("/", client.deleteAll);
  
    app.use("/api/clients", router);
  };
  