import jwt from "jsonwebtoken";
import Errors from "../error/errors.js";
import handleError from "../error/error_handler.js";
import MySQLConnection from "../db/connect.js";

export default class Authorize {
  static async loggedIn(req, res, next) {
    if (MySQLConnection.connection) {
      if (req.cookies.token) {
        const payload = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
        if (payload) {
          // Proceed with next request
          req.body.user_data = payload;
          next();
        } else {
          //bad token
          return handleError(res, Errors[403].Forbidden);
        }
      } else {
        //no token
        return handleError(res, Errors[401].Unauthorized);
      }
    } else {
      res.redirect("/");
    }
  }

  static async getTokenData(req, res, callback) {
    if (req.cookies.token) {
      const payload = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
      if (payload) {
        let query = `SELECT * FROM user WHERE user_id = ${payload.user_id};`;
        await MySQLConnection.makeQuery(query, (err, rows, columns) => {
          callback(err, rows, columns);
        });
      } else {
        //bad token
        return handleError(res, Errors[403].Forbidden);
      }
    } else {
      //no token
      return handleError(res, Errors[401].Unauthorized);
    }
  }

  static async getTokenDataAsResponse(req, res) {
    await Authorize.getTokenData(req, res, (err, rows, columns) => {
      if (err) {
        return handleError(res, Errors[500].InternalServerError);
      } else {
        res.send({ columns: columns, rows: rows });
      }
    });
  }

  /*

  Meetings Bookings Page:

  SQL select to go through teams of a user to find their clubs.
  Display this as a selection menu (fetch api)

  SQL select to go through the club selected and get its teams
  Display this as a selection menu (fetch api)

  Allow user to then go to the booking interface, and then select a set of meetings to book.
  The user will then submit, and we will use fetch api to generate the meetings.

  Have a single page selection, where you can choose the club you are booking for
  and then you can choose the team in that club which you are booking for.
  Then, you can book for the team. 

---------------------------

  Join a Club Page:

  SQL Select all clubs that the user is part of.

  SQL Select all clubs the user is not part of and display all.

  Allow them to choose a club to join, make that an endpoint with the body data being the club to join
  */
}
