import MySQLConnection from "../db/connect.js";

export default class QueryController {
  static async makeQuery(req, res) {
    let response = await MySQLConnection.makeQuery(req.body.query);
    res.json(response);
  }
}
