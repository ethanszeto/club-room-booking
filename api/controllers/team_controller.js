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
        TeamController.createTeamToUser(req, res, club_id, name, Status.Approved);
      }
    });
  }

  static async createTeam(req, res) {
    await TeamController.createTeamByName(req, res, req.body.name, req.body.club_id);
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

    let sqlAllTeams = `
    SELECT team_name, team.club_id
      FROM team
      JOIN club ON team.club_id = club.club_id
      WHERE club.club_id = ${club_id}
      ORDER BY team_name ASC;`;

    MySQLConnection.makeQuery(sqlAllTeams, (err1, allTeams, columns1) => {
      if (err1) {
        console.error(err1);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        let sqlUserTeams = `
          SELECT team_name, status
            FROM team_to_user
            WHERE user_id = ${user_id} AND club_id = ${club_id}
            ORDER BY team_name ASC;`;
        MySQLConnection.makeQuery(sqlUserTeams, (err2, userTeams, columns2) => {
          if (err2) {
            console.error(err2);
            return handleError(res, Errors[500].InternalServerError);
          } else {
            let teams = [];
            let allTeamsStr = [];
            let userTeamsStr = [];
            allTeams.forEach((team) => {
              allTeamsStr.push(team.team_name);
            });
            userTeams.forEach((team_to_user) => {
              if (Status.equals(team_to_user.status, Status.Approved)) {
                userTeamsStr.push(team_to_user.team_name);
              }
            });
            console.log(userTeamsStr);
            allTeamsStr.forEach((team) => {
              let in_team = userTeamsStr.includes(team);
              console.log(team);

              console.log(in_team);
              teams.push({ team_name: team, user_in_team: in_team });
            });
            res.send(teams);
          }
        });
      }
    });
  }
}
