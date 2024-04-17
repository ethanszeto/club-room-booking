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
    let user_id = req.body.user_data.user_id;
    let club_id = req.body.club_id;
    let team_name = req.body.team_name;

    try {
      let sqlGroup = `
        INSERT INTO meeting_group (start_time, end_time, start_date, room_id, user_id, club_id, team_name) VALUES (
          "${start_time}",
          "${end_time}",
          "${start_date}",
          ${room_id},
          ${user_id},
          ${club_id},
          "${team_name}"
        );
      `;

      await new Promise((resolve, reject) => {
        MySQLConnection.makeQuery(sqlGroup, (err, rows, columns) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      let meetingPromises = dates.map((date) => {
        let meetingSql = `
          INSERT INTO meeting (meeting_date, room_id, start_time, end_time, group_start_date) VALUES (
            "${date}",
            ${room_id},
            "${start_time}",
            "${end_time}",
            "${start_date}"
          );
        `;

        return new Promise((resolve, reject) => {
          MySQLConnection.makeQuery(meetingSql, (err, rows, columns) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });

      await Promise.all(meetingPromises);
      res.send("Updates successful");
    } catch (error) {
      handleError(res, Errors[500].InternalServerError);
    }
  }

  /*
  static async getMeetingsByTeam(req, res) {
    let team_name = req.body.team_name;
    let club_id = req.body.club_id;
    // first name, last name, room number, building name, building code
    let sql = `
      SELECT
        meeting_group.start_time,
        meeting_group.end_time,
        meeting_group.start_date,
        meeting_group.room_id,
        meeting_group.user_id,
        meeting_group.club_id,
        meeting_group.team_name,
        user.first_name,
        user.last_name,
        room.room_number,
        building.building_name,
        building.building_code,
        GROUP_CONCAT(meeting.meeting_date ORDER BY meeting.meeting_date ASC) AS meeting_dates
      FROM meeting_group
      JOIN meeting ON meeting_group.room_id = meeting.room_id AND meeting_group.start_time = meeting.start_time AND meeting_group.end_time = meeting.end_time AND meeting_group.start_date = meeting.group_start_date
      JOIN room ON meeting_group.room_id = room.room_id
      JOIN building ON room.building_id = building.building_id
      JOIN user ON meeting_group.user_id = user.user_id
      WHERE meeting_group.club_id = ${club_id}
      AND meeting_group.team_name = "${team_name}"
      GROUP BY meeting_group.start_time,
      meeting_group.end_time,
      meeting_group.start_date,
      meeting_group.room_id,
      meeting_group.user_id,
      meeting_group.club_id,
      meeting_group.team_name;
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
  */

  static async getMeetingsByTeam(req, res) {
    let team_name = req.body.team_name;
    let club_id = req.body.club_id;
    // first name, last name, room number, building name, building code
    let sql = `
      SELECT
        meeting_group.start_time,
        meeting_group.end_time,
        meeting_group.start_date,
        meeting_group.room_id,
        meeting_group.user_id,
        meeting_group.club_id,
        meeting_group.team_name,
        user.first_name,
        user.last_name,
        room.room_number,
        building.building_name,
        building.building_code
      FROM meeting_group
      JOIN room ON meeting_group.room_id = room.room_id
      JOIN building ON room.building_id = building.building_id
      JOIN user ON meeting_group.user_id = user.user_id
      WHERE meeting_group.club_id = ${club_id}
      AND meeting_group.team_name = "${team_name}"
      GROUP BY meeting_group.start_time,
      meeting_group.end_time,
      meeting_group.start_date,
      meeting_group.room_id,
      meeting_group.user_id,
      meeting_group.club_id,
      meeting_group.team_name
      ORDER BY meeting_group.start_date ASC,
      meeting_group.start_time ASC;
    `;

    MySQLConnection.makeQuery(sql, async (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        // Retrieve meeting dates separately
        for (let i = 0; i < rows.length; i++) {
          let meeting_dates = await MeetingController.getMeetingDates(
            rows[i].room_id,
            rows[i].start_time,
            rows[i].end_time,
            rows[i].start_date.toISOString().split("T")[0]
          );
          rows[i].meeting_dates = meeting_dates;
        }
        res.send({ columns: columns, rows: rows });
      }
    });
  }

  // Function to retrieve meeting dates for a specific meeting
  static async getMeetingDates(room_id, start_time, end_time, start_date) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT meeting_date
        FROM meeting
        WHERE room_id = ${room_id}
        AND start_time = "${start_time}"
        AND end_time = "${end_time}"
        AND group_start_date = "${start_date}"
        ORDER BY meeting_date ASC;
      `;
      MySQLConnection.makeQuery(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          let dates = rows.map((row) => row.meeting_date);
          resolve(dates.join(",")); // Concatenate meeting dates
        }
      });
    });
  }

  static async deleteMeetingGroup(req, res) {
    let room_id = req.body.room_id;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
    let start_date = new Date(req.body.group_start_date).toISOString().slice(0, 19).replace("T", " ");

    let sql = `
      DELETE FROM meeting_group
        WHERE room_id = ${room_id}
        AND start_time = "${start_time}"
        AND end_time = "${end_time}"
        AND start_date = "${start_date}";
    `;

    MySQLConnection.makeQuery(sql, (err, rows, columns) => {
      if (err) {
        console.error(err);
        return handleError(res, Errors[500].InternalServerError);
      } else {
        res.redirect("/meeting/show");
      }
    });
  }
}
