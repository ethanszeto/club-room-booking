import express from "express";
import path from "path";
import bodyParser from "body-parser";
import ConnectionController from "../controllers/connection_controller.js";
import QueryController from "../controllers/query_controller.js";
import UserController from "../controllers/user_controller.js";
import ClubController from "../controllers/club_controller.js";
import TeamController from "../controllers/team_controller.js";
import MeetingController from "../controllers/meeting_controller.js";
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

router.route("/user/logout").get(UserController.logout);

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

router.route("/user/approve").get(Authorize.loggedIn, (req, res) => {
  res.sendFile(path.resolve() + "/public/html/approve_user.html");
});

router.route("/meeting/book").get(Authorize.loggedIn, (req, res) => {
  res.sendFile(path.resolve() + "/public/html/book_meeting.html");
});

router.route("/meeting/show").get(Authorize.loggedIn, (req, res) => {
  res.sendFile(path.resolve() + "/public/html/show_meetings.html");
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

router.route("/user/get-token-data").post(Authorize.loggedIn, Authorize.getTokenDataAsResponse);

router.route("/user/get-clubs").post(Authorize.loggedIn, ClubController.getUserClubs);

router.route("/club/create").post(Authorize.loggedIn, ClubController.createClub);

router.route("/club/team/create").post(Authorize.loggedIn, TeamController.createTeam);

router.route("/club/get-all").post(Authorize.loggedIn, ClubController.getAllClubs);

router.route("/club/team/get-teams").post(Authorize.loggedIn, TeamController.getTeamsByClubId);

router.route("/club/team/join").post(Authorize.loggedIn, TeamController.requestJoinTeam);

router.route("/club/team/get-user-team-requests").post(Authorize.loggedIn, TeamController.getUserTeamRequests);

router.route("/club/team/post-user-team-updates").post(Authorize.loggedIn, UserController.updateRequestStatus);

router.route("/meeting/get-room-types").post(Authorize.loggedIn, MeetingController.getRoomTypes);

router.route("/meeting/get-buildings").post(Authorize.loggedIn, MeetingController.getBuildingsByRoomType);

router.route("/meeting/get-rooms").post(Authorize.loggedIn, MeetingController.getRoomsByBuildingsAndRoomType);

router.route("/meeting/get-meetings-by-dates").post(Authorize.loggedIn, MeetingController.getMeetingsByDates);

router.route("/meeting/book-meetings").post(Authorize.loggedIn, MeetingController.bookMeetings);

router.route("/meeting/get-meetings-by-team").post(Authorize.loggedIn, MeetingController.getMeetingsByTeam);

router.route("/meeting/delete-meeting").post(Authorize.loggedIn, MeetingController.deleteMeetingGroup);

export default router;
