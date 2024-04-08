import mysql from "mysql2";
import { config as dotenvConfig } from "dotenv";

export default class MySQLConnection {
  static connection;
  static error;

  static async connect(username, pass) {
    dotenvConfig();
    if (process.env.PRODUCTION == "true") {
      this.connection = mysql.createConnection({
        host: "host.docker.internal",
        port: 3306,
        user: username,
        password: pass,
        database: "club_meetings",
      });
    } else {
      this.connection = mysql.createConnection({
        host: "host.docker.internal",
        port: 3306,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: "club_meetings",
      });
    }

    this.connection.connect((err) => {
      if (err) {
        console.error(err);
        this.error = err;
      } else {
        console.log("\nConnected to mySQL server!");
      }
    });

    if (this.error) {
      throw this.error;
    }
  }

  static async makeQuery(sql, callback) {
    if (this.connection) {
      this.connection.query(sql, (err, rows, columns) => {
        if (err) {
          callback(err, null, null);
        } else {
          callback(null, rows, columns);
        }
      });
    } else {
      console.error("\nNot logged into mySQL server!");
    }
  }
}
