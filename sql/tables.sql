DROP DATABASE IF EXISTS club_meetings;
CREATE DATABASE club_meetings;
USE club_meetings;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
	user_id			INT AUTO_INCREMENT		PRIMARY KEY,
    username		VARCHAR(64)				NOT NULL UNIQUE,
    email			VARCHAR(64)				NOT NULL UNIQUE,
    first_name		VARCHAR(64)				NOT NULL,
    last_name		VARCHAR(64)				NOT NULL,
    phone_number	VARCHAR(16)				NOT NULL UNIQUE,
    password		VARCHAR(72)				NOT NULL
);

DROP TABLE IF EXISTS club;
CREATE TABLE club (
	club_id			INT AUTO_INCREMENT		PRIMARY KEY,
    club_name		VARCHAR(64)				NOT NULL UNIQUE
);

DROP TABLE IF EXISTS team;
CREATE TABLE team (
	team_name		VARCHAR(64)				NOT NULL,
    num_members		INT						NOT NULL,
    club_id			INT 					NOT NULL,
    FOREIGN KEY (club_id)
		REFERENCES club(club_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (team_name, club_id)
);

DROP TABLE IF EXISTS team_to_user;
CREATE TABLE team_to_user (
	user_id			INT										NOT NULL,
    club_id			INT										NOT NULL,
    team_name		VARCHAR(64)								NOT NULL,
    status			ENUM("approved", "pending", "denied")	NOT NULL,
    FOREIGN KEY (user_id)
		REFERENCES user(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (team_name, club_id)
		REFERENCES team(team_name, club_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (user_id, club_id, team_name)
);

DROP TABLE IF EXISTS building;
CREATE TABLE building (
	building_id		INT AUTO_INCREMENT		PRIMARY KEY,
    building_code	VARCHAR(4)				NOT NULL,
    building_name	VARCHAR(64)				NOT NULL
);

DROP TABLE IF EXISTS room;
CREATE TABLE room (
	room_id			INT AUTO_INCREMENT		PRIMARY KEY,
    room_number		INT						NOT NULL,
    capacity 		INT						NOT NULL,
    building_id		INT						NOT NULL,
    FOREIGN KEY (building_id)
		REFERENCES building(building_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS room_type;
CREATE TABLE room_type (
	type_name		VARCHAR(64)				PRIMARY KEY
);

DROP TABLE IF EXISTS type_to_room;
CREATE TABLE type_to_room (
	type_name		VARCHAR(64)				NOT NULL,
    room_id			INT						NOT NULL,
    FOREIGN KEY (type_name)
		REFERENCES room_type(type_name)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (room_id)
		REFERENCES room(room_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (type_name, room_id)
);

DROP TABLE IF EXISTS meeting_group;
CREATE TABLE meeting_group (
	start_time		TIME					NOT NULL,
    end_time		TIME					NOT NULL,
    start_date		DATE					NOT NULL,
    room_id			INT						NOT NULL,
    user_id			INT						NOT NULL,
    club_id			INT						NOT NULL,
    team_name		VARCHAR(64)				NOT NULL,
    FOREIGN KEY (room_id)
		REFERENCES room(room_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_id)
		REFERENCES user(user_id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (club_id, team_name)
		REFERENCES team(club_id, team_name)
		ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (room_id, start_time, end_time, start_date)
);

DROP TABLE IF EXISTS meeting;
CREATE TABLE meeting (
	meeting_date	DATE					NOT NULL,
    room_id			INT						NOT NULL,
    start_time		TIME					NOT NULL,
    end_time		TIME					NOT NULL,
    FOREIGN KEY (room_id, start_time, end_time)
		REFERENCES meeting_group(room_id, start_time, end_time)
        ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(room_id, start_time, end_time, meeting_date)
);

DELIMITER $$

CREATE TRIGGER update_num_members
AFTER INSERT ON team_to_user
FOR EACH ROW
BEGIN
    UPDATE team
    SET num_members = num_members + 1
    WHERE team_name = NEW.team_name AND club_id = NEW.club_id;
END;
$$

DELIMITER ;

