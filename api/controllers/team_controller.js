import Errors from "../error/errors.js";
import handleError from "../error/error_handler.js";
import MySQLConnection from "../db/connect.js";
import Status from "../enum/status.js";
import Authorize from "../auth/authorization.js";

export default class TeamController {
  static async createTeamByName(req, res, name, club_id) {
    let sql = `INSERT INTO team (team_name, num_members, club_id) VALUES (
          "${name}",
          1,
          "${club_id}"
        );`;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        console.error(err);
        handleError(res, Errors[500].InternalServerError);
      } else {
        console.log(rows);
        this.createTeamToUser(req, res, club_id, name, Status.Approved);
      }
    });
  }

  static async createTeam(req, res) {
    createTeamByName(req, res, req.body.name, req.body.club_id);
  }

  static async checkTeamNameExistsInClub(name, club_id, callback) {
    let sql = `SELECT * FROM team WHERE team_name = "${name}" AND club_id = "${club_id}";`;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        console.error(err);
        handleError(res, Errors[500].InternalServerError);
      } else {
        if (rows.length == 0) {
          callback(false);
        } else {
          callback(true);
        }
      }
    });
  }

  static async createTeamToUser(req, res, club_id, team_name, status) {
    Authorize.getTokenData(req, res, (err, rows, columns) => {
      if (err) {
        console.error(err);
        handleError(res, Errors[500].InternalServerError);
      } else {
        let sql = `INSERT INTO team_to_user (user_id, club_id, team_name, status) VALUES (
          "${rows[0].user_id}",
          "${club_id}",
          "${team_name}",
          "${status}"
        );`;

        MySQLConnection.makeQuery(sql, (err, rows, columns) => {
          if (err) {
            console.error(err);
            handleError(res, Errors[500].InternalServerError);
          } else {
            res.send({ columns: columns, rows: rows });
          }
        });
      }
    });
  }
}
