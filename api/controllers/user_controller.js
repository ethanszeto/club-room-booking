import MySQLConnection from "../db/connect.js";
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
        res.redirect("/");
      } else {
        res.redirect("/user/login");
      }
    });
  }
}
