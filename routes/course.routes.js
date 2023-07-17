module.exports = (app) => {
    const courseController = require("../controllers/course.controller.js");
  
    const express = require("express");
    const router = express.Router();
    

    // Create a new Course
    router.post("/", courseController.create);
    
    // Retrieve all Courses
    router.get("/", courseController.findAll);
    
    // Retrieve a single Course with id
    router.get("/:id", courseController.findOne);
    
    // Update a Course with id
    router.put("/:id", courseController.update);
    
    // Delete a Course with id
    router.delete("/:id", courseController.delete);
    
    // Retrieve Courses by Client
    router.get("/client/:clientId", courseController.findByClient);
    
    // Retrieve Courses by Taximan
    router.get("/taximan/:taximanId", courseController.findByTaximan);
    
    // Retrieve Courses by Taxi
    router.get("/taxi/:taxiId", courseController.findByTaxi);
  
    app.use("/api/course", router);
  };
