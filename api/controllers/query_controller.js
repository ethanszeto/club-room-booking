import MySQLConnection from "../db/connect.js";

export default class QueryController {
  static async makeQuery(req, res) {
    console.log(req.body);
    await MySQLConnection.makeQuery(req, res, req.body.query);
  }
}
