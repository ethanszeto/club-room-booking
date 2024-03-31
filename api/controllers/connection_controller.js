import MySQLConnection from "../db/connect.js";

export default class ConnectionController {
  static async connect(req, res) {
    try {
      await MySQLConnection.connect(req.body.username, req.body.password);
    } catch (e) {
      //handle this
    }
  }
}
