import express from "express";
import path from "path";
import bodyParser from "body-parser";
import ConnectionController from "../controllers/connection_controller.js";
import QueryController from "../controllers/query_controller.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.route("/").get((req, res) => {
  res.sendFile(path.resolve() + "/public/html/index.html");
});

router.route("/public/js/:script.js").get((req, res) => {
  res.sendFile(path.resolve() + `public/js/${req.params.script}.js)`);
});

router.route("/public/css/:style.css").get((req, res) => {
  res.sendFile(path.resolve() + `public/css/${req.params.style}.css)`);
});

router.route("/connect").post(ConnectionController.connect);

router.route("/request").post(QueryController.makeQuery);

export default router;
