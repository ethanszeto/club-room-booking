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

  static async makeQuery(sql) {
    let outputRows, outputFields;
    if (this.connection) {
      this.connection.query(sql, (err, rows, fields) => {});
      if (err) {
        this.error = err;
      }
      outputRows = rows;
      outputFields = fields;
    } else {
      // not logged in
    }
  }
}
