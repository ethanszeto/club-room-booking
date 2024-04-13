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
        TeamController.createTeamToUser(req, res, req.body.user_data.user_id, club_id, name, Status.Approved);
      }
    });
  }

  static async createTeam(req, res) {
    await TeamController.createTeamByName(req, res, req.body.name, req.body.club_id);
  }

  static async createTeamToUser(req, res, user_id, club_id, team_name, status) {
    let sql = `INSERT INTO team_to_user (user_id, club_id, team_name, status) VALUES (
          "${user_id}",
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

  static async getTeamsByClubId(req, res) {
    let data = req.body.user_data;
    let user_id = data.user_id;
    let club_id = req.body.club_id;

    let sqlNotUserTeams = `
      SELECT DISTINCT team.team_name
      FROM team
      JOIN team_to_user ON team.team_name = team_to_user.team_name AND team.club_id = team_to_user.club_id
      WHERE team_to_user.club_id = ${club_id}
      AND team.team_name NOT IN (
          SELECT team_to_user.team_name
          FROM team_to_user
          WHERE user_id = ${user_id} AND club_id = ${club_id}
      )
      ORDER BY team_name ASC;
    `;

    MySQLConnection.makeQuery(sqlNotUserTeams, (err1, notUserTeams, columns1) => {
      if (err1) {
        console.error(err1);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        let sqlUserTeams = `
          SELECT DISTINCT team_name, status
            FROM team_to_user
            WHERE user_id = ${user_id} AND club_id = ${club_id}
            ORDER BY team_name ASC;`;
        MySQLConnection.makeQuery(sqlUserTeams, (err2, userTeams, columns2) => {
          if (err2) {
            console.error(err2);
            return handleError(res, Errors[500].InternalServerError);
          } else {
            console.log(userTeams);
            console.log(notUserTeams);
            let teams = [];
            notUserTeams.forEach((team) => {
              teams.push({ team_name: team.team_name, status: Status.None });
            });
            userTeams.forEach((team) => {
              teams.push({ team_name: team.team_name, status: team.status });
            });
            res.send({ teams: teams });
          }
        });
      }
    });
  }

  static async requestJoinTeam(req, res) {
    let data = req.body.user_data;
    let user_id = data.user_id;
    let club_id = req.body.club_id;
    let team_name = req.body.team_name;

    TeamController.createTeamToUser(req, res, user_id, club_id, team_name, Status.Pending);
  }

  static async getUserTeamRequests(req, res) {
    let data = req.body.user_data;
    let user_id = data.user_id;

    let sql = `
    SELECT user.user_id, user.first_name, user.last_name, user.email, club.club_id, club.club_name, team.team_name
      FROM user
      JOIN team_to_user ON user.user_id = team_to_user.user_id
      JOIN team ON team_to_user.club_id = team.club_id AND team_to_user.team_name = team.team_name
      JOIN club ON team.club_id = club.club_id
      WHERE (team.club_id, team.team_name) IN (
        SELECT t2.club_id, t2.team_name
          FROM team t2
          JOIN team_to_user ON team.club_id = team_to_user.club_id AND team.team_name = team_to_user.team_name
          JOIN user ON team_to_user.user_id = user.user_id
          WHERE user.user_id = ${user_id} AND team_to_user.status = "${Status.Approved}"
          ) AND team_to_user.status = "${Status.Pending}";
    `;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        console.error(err);
        handleError(res, Errors[500].InternalServerError);
      } else {
        res.send({ columns: columns, rows: rows });
      }
    });
  }
}
