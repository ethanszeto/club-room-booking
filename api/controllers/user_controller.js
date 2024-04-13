import MySQLConnection from "../db/connect.js";
import Errors from "../error/errors.js";
import handleError from "../error/error_handler.js";
import TeamController from "./team_controller.js";
import Status from "../enum/status.js";
import { config as dotenvConfig } from "dotenv";
import jwt from "jsonwebtoken";

export default class UserController {
  static async signup(req, res) {
    let sql = `INSERT INTO user (username, email, first_name, last_name, phone_number, password) VALUES (
        "${req.body.username}",
        "${req.body.email}",
        "${req.body.first_name}",
        "${req.body.last_name}",
        "${req.body.phone_number}",
        "${req.body.password}"
    );`;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (rows != undefined) {
        res.redirect("/user/login");
      } else {
        // potentially check which field is duplicate
        // bad signup -- try another username/email/phone
        let sql = `SELECT username FROM user WHERE username = "${req.body.username}";`;

        MySQLConnection.makeQuery(sql, (err, rows, colums) => {
          if (rows != undefined) {
            console.log("Username already exists");
          }
        });

        sql = `SELECT email FROM user WHERE email = "${req.body.email}";`;

        MySQLConnection.makeQuery(sql, (err, rows, colums) => {
          if (rows != undefined) {
            console.log("User with email already exists");
          }
        });

        sql = `SELECT phone_number FROM user WHERE phone_number = "${req.body.phone_number}";`;

        MySQLConnection.makeQuery(sql, (err, rows, colums) => {
          if (rows != undefined) {
            console.log("User with phone number already exists");
          }
        });

        res.redirect("/user/signup");
      }
    });
  }

  static async login(req, res) {
    let sql = `SELECT * from user WHERE
        username = "${req.body.username}" AND
        password = "${req.body.password}";`;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      console.log(rows);
      if (rows.length === 1) {
        dotenvConfig();
        let token = jwt.sign(
          {
            user_id: rows[0].user_id,
            username: rows[0].username,
            email: rows[0].email,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            phone_number: rows[0].phone_number,
            password: rows[0].password,
          },
          process.env.TOKEN_KEY
        );
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
        // success, change later
        res.redirect("/");
      } else {
        handleError(res, Errors[401].LoginFailed);
      }
    });
  }

  static async requestToJoinTeam(req, res) {
    TeamController.createTeamToUser(req, res, req.body.user_data.user_id, req.body.club_id, req.body.team_name, Status.Pending);
  }

  static async updateRequestStatus(req, res) {
    let updates = req.body.updates;
    let promises = [];

    for (let update of updates) {
      let user_id = update.user_id;
      let club_id = update.club_id;
      let team_name = update.team_name;
      let status = update.approval ? Status.Approved : Status.Denied;

      let sql = `
        UPDATE team_to_user
        SET status = "${status}"
        WHERE user_id = ${user_id} AND club_id = ${club_id} AND team_name = "${team_name}";
      `;

      let promise = new Promise((resolve, reject) => {
        MySQLConnection.makeQuery(sql, (err, rows, columns) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve({ columns: columns, rows: rows });
          }
        });
      });

      promises.push(promise);
    }

    try {
      await Promise.all(promises);
      res.send("Updates successful");
    } catch (error) {
      handleError(res, Errors[500].InternalServerError);
    }
  }
}

/*
static async updateRequestStatus(req, res) {
    let updates = req.body.updates;

    updates.forEach((update) => {
      let user_id = update.user_id;
      let club_id = update.club_id;
      let team_name = update.team_name;
      let status;
      if (update.approval) {
        status = Status.Approved;
      } else {
        status = Status.Denied;
      }
      let sql = `
        UPDATE team_to_user
          SET status = "${status}"
          WHERE user_id = ${user_id} AND club_id = ${club_id} AND team_name = "${team_name}";
      `;

      MySQLConnection.makeQuery(sql, (err, rows, columns) => {
        if (err) {
          console.error(err);
          handleError(res, Errors[500].InternalServerError);
        } else {
          res.send({ columns: columns, rows: rows });
        }
      });
    });
  }
*/
