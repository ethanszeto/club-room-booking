import MySQLConnection from "../db/connect.js";
import handleError from "../error/error_handler.js";
import Errors from "../error/errors.js";

export default class ConnectionController {
  static async connect(req, res) {
    console.log(req.body);
    await MySQLConnection.connect(req.body.username, req.body.password, (err) => {
      if (err) {
        console.error("Failed to connect!");
        handleError(res, Errors[500].MySQLConnectionError);
      } else {
        console.log("Succeeded to connect!");
        res.status(200).send({ message: "Connected to local mySQL instance!" });
      }
    });
  }
}
