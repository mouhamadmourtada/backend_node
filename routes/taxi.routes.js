
module.exports = (app)=> {
    const taxiController = require("../controllers/taxi.controller");
    const express = require("express");
    const router = express.Router();

    // Create a new Taxi
    router.post("/", taxiController.create);
    
    // Retrieve all Taxis
    router.get("/", taxiController.findAll);
    
    // Retrieve a single Taxi with id
    router.get("/:id", taxiController.findOne);
    
    // Update a Taxi with id
    router.put("/:id", taxiController.update);
    
    // Delete a Taxi with id
    router.delete("/:id", taxiController.delete);
    

    // Retrieve a Taxi by Taximan
    router.get("/taximan/:taximanId", taxiController.findByTaximan);


    app.use("/api/taxi", router);

}
