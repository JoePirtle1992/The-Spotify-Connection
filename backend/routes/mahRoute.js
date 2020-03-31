const express = require("express");
const mahFirstRoute = express.Router();
const mahFirstController = require("../controllers/mahFirstController");

  mahFirstRoute
  .route("/login")
  .get(mahFirstController.GoToLogin)

  mahFirstRoute
  .route("/callback")
  .get(mahFirstController.callBack)

  mahFirstRoute
  .route("/finally")
  .get(mahFirstController.finally)

  mahFirstRoute
  .route("/heresHoping")
  .get(mahFirstController.heresHoping)

  mahFirstRoute
  .route("/playlist/:id/:offset")
  .get(mahFirstController.getTheRest)


module.exports = mahFirstRoute;