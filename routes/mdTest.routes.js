module.exports = (app) => {
  const mdTest = require("../controllers/mdTest.controller.js");

  const express = require("express");
  const router = express.Router();

  // Create a new MdTest
  router.post("/", mdTest.create);

  // Retrieve all mdTest
  router.get("/", mdTest.findAll);

  // Retrieve all published mdTest
  router.get("/published", mdTest.findAllPublished);

  // Retrieve a single MdTest with id
  router.get("/:id", mdTest.findOne);

  // Update a MdTest with id
  router.put("/:id", mdTest.update);

  // Delete a MdTest with id
  router.delete("/:id", mdTest.delete);

  // Delete all mdTest
  router.delete("/", mdTest.deleteAll);

  app.use("/api/mdTest", router);
};
