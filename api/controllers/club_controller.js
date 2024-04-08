import MySQLConnection from "../db/connect.js";

export default class ClubController {
  static async createClub(req, res) {
    let sql = `INSERT INTO club (club_name) VALUES (
        "${req.body.club_name}"
    );`;

    //MySQLConnection.makeQuery(sql, ())
  }
}
