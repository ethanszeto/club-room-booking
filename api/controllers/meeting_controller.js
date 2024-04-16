import MySQLConnection from "../db/connect.js";
import Errors from "../error/errors.js";
import handleError from "../error/error_handler.js";

export default class MeetingController {
  static async getRoomTypes(req, res) {
    let sql = `
    SELECT type_name
        FROM room_type
        ORDER BY type_name ASC;
        `;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        res.send({ columns: columns, rows: rows });
      }
    });
  }

  static async getBuildingsByRoomType(req, res) {
    let club_id = req.body.club_id;
    let team_name = req.body.team_name;
    let room_type = req.body.room_type;

    let sql_num_members = `
    SELECT team.num_members
        FROM team
        WHERE team.team_name = "${team_name}"
        AND team.club_id = ${club_id};
        `;

    MySQLConnection.makeQuery(sql_num_members, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        let sql_building = `
        SELECT DISTINCT building.building_id, building.building_code, building.building_name
            FROM building
            JOIN room ON building.building_id = room.building_id
            JOIN type_to_room ON room.room_id = type_to_room.room_id
            WHERE type_to_room.type_name = "${room_type}"
            AND room.capacity >= ${rows[0].num_members}
            ORDER BY building_name ASC;
            `;

        MySQLConnection.makeQuery(sql_building, (err, rows, columns) => {
          if (err) {
            console.error(err);
            return handleError(res, Errors[500].InternalServerError);
          } else {
            res.send({ columns: columns, rows: rows });
          }
        });
      }
    });
  }

  static async getRoomsByBuildingsAndRoomType(req, res) {
    let club_id = req.body.club_id;
    let team_name = req.body.team_name;
    let room_type = req.body.room_type;
    let building_id = req.body.building_id;

    let sql_num_members = `
    SELECT team.num_members
        FROM team
        WHERE team.team_name = "${team_name}"
        AND team.club_id = ${club_id};
        `;

    MySQLConnection.makeQuery(sql_num_members, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        let sql_building = `
        SELECT DISTINCT room.room_id, room.room_number, room.capacity, room.building_id
            FROM building
            JOIN room ON building.building_id = room.building_id
            JOIN type_to_room ON room.room_id = type_to_room.room_id
            WHERE building.building_id = ${building_id}
            AND type_to_room.type_name = "${room_type}"
            AND room.capacity >= ${rows[0].num_members}
            ORDER BY room.room_number ASC;
            `;

        MySQLConnection.makeQuery(sql_building, (err, rows, columns) => {
          if (err) {
            console.error(err);
            return handleError(res, Errors[500].InternalServerError);
          } else {
            res.send({ columns: columns, rows: rows });
          }
        });
      }
    });
  }

  static async getMeetingsByDates(req, res) {
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let room_id = req.body.room_id;

    let sql = `
        SELECT meeting.start_time, meeting.end_time, meeting.meeting_date
            FROM meeting
            WHERE room_id = ${room_id}
            AND meeting_date >= "${start_date}"
            AND meeting_date <= "${end_date}";
    `;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        res.send({ columns: columns, rows: rows });
      }
    });
  }

  // mtbDates, mtbStartTime, mtbEndTime, dateSlotStart, dateSlotEnd, roomId
  static async bookMeetings(req, res) {
    let dates = req.body.dates;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
    let start_date = dates[0];
    let room_id = req.body.room_id;
    let user_id = req.body.user_id;
    let club_id = req.body.club_id;
    let team_name = req.body.team_name;

    let sql = `
      INSERT INTO meeting_group (start_time, end_time, start_date, room_id, user_id, club_id, team_name) VALUES (
        ${start_time},
        ${end_time},
        ${start_date},
        ${room_id},
        ${user_id},
        ${club_id},
        ${team_name}
      );
    `;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        dates.forEach((date) => {
          let meetingSql;
        });
        res.send({ columns: columns, rows: rows });
      }
    });
  }
}
