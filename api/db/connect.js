import mysql from "mysql2";

export default class MySQLConnection {
  static connection;
  static error;

  static async connect(username, password) {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: username,
      password: password,
      database: process.env.DB_NAME,
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
}
