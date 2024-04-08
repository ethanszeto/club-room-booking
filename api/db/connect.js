import mysql from "mysql2";

export default class MySQLConnection {
  static connection;
  static error;

  static async connect(username, pass) {
    this.connection = mysql.createConnection({
      host: "host.docker.internal",
      port: 3306,
      user: username,
      password: pass,
      database: "club_meetings",
    });

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

  static async makeQuery(req, res, sql) {
    if (this.connection) {
      this.connection.query(sql, (err, rows, columns) => {
        if (err) {
          console.error(err);
        } else {
          console.log({ cols: columns, rows: rows });
          res.send({ cols: columns, rows: rows });
        }
      });
    } else {
      console.error("\nNot logged into mySQL server!");
    }
  }
}
