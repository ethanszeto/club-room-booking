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
      this.connection.query(sql, (err, rows, columns) => {
        if (err) {
          this.error = err;
        } else {
          outputRows = rows;
          outputColumns = columns;
        }
      });
    } else {
      console.error("\nNot logged into mySQL server!");
      this.error = "\nNot logged into mySQL server!";
    }

    if (this.error) {
      throw this.error;
    }

    return { cols: outputColumns, rows: outputRows };
  }
}
