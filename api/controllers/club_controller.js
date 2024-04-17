import MySQLConnection from "../db/connect.js";
import Errors from "../error/errors.js";
import TeamController from "./team_controller.js";
import handleError from "../error/error_handler.js";
import Status from "../enum/status.js";

export default class ClubController {
  static async createClub(req, res) {
    let sqlCreateClub = `INSERT INTO club (club_name) VALUES (
        "${req.body.club_name}"
    );`;

    MySQLConnection.makeQuery(sqlCreateClub, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      }
    });

    let sqlGetClub = `SELECT * FROM club WHERE club_name = "${req.body.club_name}";`;
    MySQLConnection.makeQuery(sqlGetClub, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        TeamController.createTeamByName(req, res, "Eboard", rows[0].club_id);
      }
    });
  }

  static async getAllClubs(req, res) {
    let sql = `SELECT * FROM club;`;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        res.send({ columns: columns, rows: rows });
      }
    });
  }

  static async getUserClubs(req, res) {
    let data = req.body.user_data;

    let sql = `
    SELECT DISTINCT club_name, club.club_id
      FROM club
      JOIN team ON club.club_id = team.club_id
      JOIN team_to_user ON team.team_name = team_to_user.team_name AND team.club_id = team_to_user.club_id
      JOIN user ON team_to_user.user_id = ${data.user_id}
      WHERE team_to_user.status = "${Status.Approved}"
      ORDER BY club_name ASC;
    `;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        handleError(res, Errors[500].InternalServerError);
      } else {
        res.send({ columns: columns, rows: rows });
      }
    });
  }
}
