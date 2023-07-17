module.exports = (app)=>{
    const express = require("express");
    const router = express.Router();
    const taximanController = require("../controllers/taximan.controller");
    
    // Create a new Taximan
    router.post("/", taximanController.create);
    
    // Retrieve all Taximen
    router.get("/", taximanController.findAll);
    
    // Retrieve a single Taximan with id
    router.get("/:id", taximanController.findOne);
    
    // Update a Taximan with id
    router.put("/:id", taximanController.update);
    
    // Delete a Taximan with id
    router.delete("/:id", taximanController.delete);

    app.use("/api/taximan", router);
}