import Errors from "../error/errors.js";
import handleError from "../error/error_handler.js";
import MySQLConnection from "../db/connect.js";

export default class QueryController {
  static async makeQuery(req, res) {
    console.log(req.body);
    await MySQLConnection.makeQuery(req.body.query, (err, rows, columns) => {
      if (err) {
        console.log(err);
        return handleError(res, Errors[500].InternalServerError);
      }
      res.send({ columns: columns, rows: rows });
    });
  }
}
