import express from "express";
import path from "path";
import bodyParser from "body-parser";
import ConnectionController from "../controllers/connection_controller.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.route("/").get((req, res) => {
  res.sendFile(path.resolve() + "/public/html/index.html");
});

router.route("/public/js/:script.js").get((req, res) => {
  res.sendFile(path.resolve() + `public/js/${req.params}.js)`);
});

router.route("/public/css/:style.css").get((req, res) => {
  res.sendFile(path.resolve() + `public/css/${req.params}.css)`);
});

router.route("/connect").post(ConnectionController.connect);

export default router;
