import express from "express";
import path from "path";
import bodyParser from "body-parser";
import ConnectionController from "../controllers/connection_controller.js";
import QueryController from "../controllers/query_controller.js";
import UserController from "../controllers/user_controller.js";
import ClubController from "../controllers/club_controller.js";
import Authorize from "../auth/authorization.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.route("/").get((req, res) => {
  res.sendFile(path.resolve() + "/public/html/index.html");
});

router.route("/user/signup").get((req, res) => {
  res.sendFile(path.resolve() + "/public/html/signup.html");
});

router.route("/user/login").get((req, res) => {
  res.sendFile(path.resolve() + "/public/html/login.html");
});

router.route("/public/js/:script.js").get((req, res) => {
  res.sendFile(path.resolve() + `public/js/${req.params.script}.js)`);
});

router.route("/public/css/:style.css").get((req, res) => {
  res.sendFile(path.resolve() + `public/css/${req.params.style}.css)`);
});

///////////////////////////////////////////////////////////////////////

router.route("/connect").post(ConnectionController.connect);

router.route("/request").post(QueryController.makeQuery);

router.route("/user/signup").post(UserController.signup);

router.route("/user/login").post(UserController.login);

router.route("/club/create").post(Authorize.loggedIn, ClubController.createClub);

export default router;
