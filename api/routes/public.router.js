import express from "express";
import path from "path";
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.route("/").get((req, res) => {
  res.sendFile(path.resolve() + "/public/html/index.html");
});

export default router;
