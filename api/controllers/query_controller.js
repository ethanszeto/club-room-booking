import MySQLConnection from "../db/connect.js";

export default class QueryController {
  static async makeQuery(req, res) {
    console.log(req.body);
    await MySQLConnection.makeQuery(req.body.query, (err, rows, columns) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.send({ columns: columns, rows: rows });
    });
  }
}
