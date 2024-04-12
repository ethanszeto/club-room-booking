import express from "express";
import path from "path";
import bodyParser from "body-parser";
import ConnectionController from "../controllers/connection_controller.js";
import QueryController from "../controllers/query_controller.js";
import UserController from "../controllers/user_controller.js";
import ClubController from "../controllers/club_controller.js";
import TeamController from "../controllers/team_controller.js";
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

router.route("/user/profile").get(Authorize.loggedIn, (req, res) => {
  res.sendFile(path.resolve() + "/public/html/profile.html");
});

router.route("/club/create").get(Authorize.loggedIn, (req, res) => {
  res.sendFile(path.resolve() + "/public/html/create_club.html");
});

router.route("/club/team/create").get(Authorize.loggedIn, (req, res) => {
  res.sendFile(path.resolve() + "/public/html/create_team.html");
});

router.route("/club/team/join").get(Authorize.loggedIn, (req, res) => {
  res.sendFile(path.resolve() + "/public/html/join_team.html");
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

router.route("/club/team/create").post(Authorize.loggedIn, TeamController.createTeam);

router.route("/club/get-all").post(Authorize.loggedIn, ClubController.getAllClubs);

router.route("/club/team/get-teams").post(Authorize.loggedIn, TeamController.getTeamsByClubId);

router.route("/user/get-token-data").post(Authorize.loggedIn, Authorize.getTokenDataAsResponse);

router.route("/user/get-clubs").post(Authorize.loggedIn, UserController.getUserClubs);

export default router;
