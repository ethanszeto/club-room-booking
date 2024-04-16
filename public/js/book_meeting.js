document.getElementById("select-club").addEventListener("change", loadTeams);
document.getElementById("select-team").addEventListener("change", loadRoomTypes);
document.getElementById("select-room-type").addEventListener("change", loadBuildings);
document.getElementById("select-building").addEventListener("change", loadRooms);
document.getElementById("select-meeting-type").addEventListener("change", changeMeetingDateOptions);
document.getElementById("submit-meeting").addEventListener("click", validateAndBookMeeting);
document.getElementById("select-room").addEventListener("change", loadAvailabilities);
document.getElementById("start-time").addEventListener("change", loadAvailabilities);
document.getElementById("end-time").addEventListener("change", loadAvailabilities);
document.getElementById("select-date").addEventListener("change", loadAvailabilities);
document.getElementById("select-start-date").addEventListener("change", loadAvailabilities);
document.getElementById("select-end-date").addEventListener("change", loadAvailabilities);

window.addEventListener("load", loadClubs);

changeMeetingDateOptions();

async function loadClubs() {
  let response = await request("POST", {}, "/club/get-all");
  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    response.rows.forEach((club) => {
      let option = document.createElement("option");
      option.value = club.club_id;
      option.innerHTML = club.club_name;
      document.getElementById("select-club").appendChild(option);
    });
  }
  await loadTeams();
}

async function loadTeams() {
  let club_id = document.getElementById("select-club").value;
  let response = await request("POST", { club_id: club_id }, "/club/team/get-teams");

  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    document.getElementById("select-team").innerHTML = "";
    response.teams.forEach((team) => {
      let option = document.createElement("option");
      if (team.status != "approved") {
        option.disabled = "true";
      }
      option.value = team.team_name;
      option.innerHTML = team.team_name;
      document.getElementById("select-team").appendChild(option);
    });
  }
  loadRoomTypes();
}

async function loadRoomTypes() {
  let response = await request("POST", {}, "/meeting/get-room-types");
  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    if (response.rows) {
      document.getElementById("select-room-type").innerHTML = "";
      response.rows.forEach((type) => {
        let option = document.createElement("option");
        option.value = type.type_name;
        option.innerHTML = type.type_name;
        document.getElementById("select-room-type").appendChild(option);
      });
    } else {
      // no
    }
  }
  loadBuildings();
}

async function loadBuildings() {
  let club = document.getElementById("select-club").value;
  let team = document.getElementById("select-team").value;
  let roomType = document.getElementById("select-room-type").value;

  if (!club) {
    alert("Please select a club!");
    return;
  }

  if (!team) {
    alert("Please select a team!");
    return;
  }

  if (!roomType) {
    alert("Please select a room type!");
    return;
  }

  let response = await request("POST", { room_type: roomType, club_id: club, team_name: team }, "/meeting/get-buildings");
  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    if (response.rows) {
      document.getElementById("select-building").innerHTML = "";
      response.rows.forEach((building) => {
        let option = document.createElement("option");
        option.value = building.building_id;
        option.innerHTML = `${building.building_code} - ${building.building_name}`;
        document.getElementById("select-building").appendChild(option);
      });
    }
  }
  loadRooms();
}

async function loadRooms() {
  let club = document.getElementById("select-club").value;
  let team = document.getElementById("select-team").value;
  let roomType = document.getElementById("select-room-type").value;
  let building = document.getElementById("select-building").value;

  if (!club) {
    alert("Please select a club!");
    return;
  }

  if (!team) {
    alert("Please select a team!");
    return;
  }

  if (!roomType) {
    alert("Please select a room type!");
    return;
  }

  if (!building) {
    alert("Please select a building!");
    return;
  }

  let response = await request(
    "POST",
    { room_type: roomType, club_id: club, team_name: team, building_id: building },
    "/meeting/get-rooms"
  );
  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    if (response.rows) {
      document.getElementById("select-room").innerHTML = "";
      response.rows.forEach((room) => {
        let option = document.createElement("option");
        option.value = room.room_id;
        option.innerHTML = `Room ${room.room_number} - capacity ${room.capacity}`;
        document.getElementById("select-room").appendChild(option);
      });
    }
  }
}

async function loadAvailabilities() {
  let availability = validateAllInputsForAvailability();
  if (!availability) {
    return;
  }

  let response = await request(
    "POST",
    { room_id: availability.room_id, start_date: availability.start_date, end_date: availability.end_date },
    "/meeting/get-meetings-by-dates"
  );
  if (response.error) {
    console.error(response.error);
  } else {
    if (response.rows) {
      document.getElementById("availabilities-display").innerHTML = "";
      response.rows.forEach((meeting) => {
        let meetingText = document.createElement("p");
        meetingText.innerHTML = `Room already booked on: ${meeting.meeting_date} from ${meeting.start_time} to ${meeting.end_time}`;
        document.getElementById("availabilities-display").appendChild(meetingText);
      });
    }
  }
}

function validateAllInputsForAvailability() {
  let roomId = document.getElementById("select-room").value;
  let startTime = document.getElementById("start-time").value;
  let endTime = document.getElementById("end-time").value;
  let state = document.getElementById("select-meeting-type").value;
  if (state == "single") {
    let date = document.getElementById("select-date").value;
    console.log({ room_id: roomId, start_date: date, end_date: date, start_time: startTime, end_time: endTime, weekday: false });
    return roomId && startTime && endTime && date
      ? { room_id: roomId, start_date: date, end_date: date, start_time: startTime, end_time: endTime, weekday: false }
      : false;
  } else {
    let startDate = document.getElementById("select-start-date").value;
    let endDate = document.getElementById("select-end-date").value;
    let weekday = document.getElementById("select-weekday").value;
    console.log({
      room_id: roomId,
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
      weekday: weekday,
    });
    return roomId && startTime && endTime && startDate && endDate && weekday != undefined
      ? { room_id: roomId, start_date: startDate, end_date: endDate, start_time: startTime, end_time: endTime, weekday: weekday }
      : false;
  }
}

function changeMeetingDateOptions() {
  let state = document.getElementById("select-meeting-type").value;
  console.log(state);
  if (state == "single") {
    document.getElementById("date-select-content-recurring").style.display = "none";
    document.getElementById("date-select-content-single").style.display = "block";
    document.getElementById("select-weekday-content").style.display = "none";
  } else {
    document.getElementById("date-select-content-recurring").style.display = "block";
    document.getElementById("date-select-content-single").style.display = "none";
    document.getElementById("select-weekday-content").style.display = "block";
  }
}

async function validateAndBookMeeting() {
  let availability = validateAllInputsForAvailability();
  if (!availability) {
    document.getElementById("error-display").innerHTML = "Please fill out all fields before submitting.";
    return;
  }

  let dates;
  if (availability.weekday != undefined) {
    dates = generateMeetingDates(availability.start_date, availability.end_date, parseInt(availability.weekday));
  } else {
    dates = [availability.start_date];
  }

  confirmAvailability(
    dates,
    availability.start_time,
    availability.end_time,
    availability.start_date,
    availability.end_date,
    availability.room_id
  );
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function generateMeetingDates(startDate, endDate, dayOfWeek) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const dates = [];
  let currentDate = new Date(startDate.getTime()); // Create a new Date object to avoid reference issues

  // Loop through dates between start and end dates
  while (currentDate <= endDate) {
    if (currentDate.getDay() == dayOfWeek) {
      dates.push(formatDate(currentDate)); // Format date and add to the array
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

/**
 *
 * @param {List[Date]} mtbDates
 * @param {Time} mtbStartTime
 * @param {Time} mtbEndTime
 * @param {Date} timeSlotStart
 * @param {Date} timeSlotEnd
 * @param {Int} roomId
 */
async function confirmAvailability(mtbDates, mtbStartTime, mtbEndTime, dateSlotStart, dateSlotEnd, roomId) {
  let response = await request(
    "POST",
    { start_date: dateSlotStart, end_date: dateSlotEnd, room_id: roomId },
    "/meeting/get-meetings-by-dates"
  );
  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    if (!response.rows) {
      return;
    }

    //this validation not working
    // TODO+ need to validate start time < end time
    // validate start date < end date at input
    if (!mtbDates) {
      document.getElementById("error-display").innerHTML = "Invalid timeslots - no meetings to book.";
      return;
    }

    let invalid = false;

    response.rows.forEach((meeting) => {
      let meeting_date = meeting.meeting_date;
      let start_time = meeting.start_time;
      let end_time = meeting.end_time;

      mtbDates.forEach((date) => {
        if (new Date(meeting_date).getTime() == new Date(date).getTime() && start_time < mtbEndTime && end_time > mtbStartTime) {
          document.getElementById("error-display").innerHTML = "Invalid timeslots - already booked";
          invalid = true;
        }
      });
    });

    if (!invalid) {
      bookMeeting(mtbDates, mtbStartTime + ":00", mtbEndTime + ":00", roomId);
    }
  }
}

async function bookMeeting(mtbDates, mtbStartTime, mtbEndTime, roomId) {
  let clubId = document.getElementById("select-club").value;
  let teamName = document.getElementById("select-team").value;
  let response = await request(
    "POST",
    { dates: mtbDates, start_time: mtbStartTime, end_time: mtbEndTime, room_id: roomId, club_id: clubId, team_name: teamName },
    "/meeting/book-meetings"
  );

  if (response.error) {
    console.log(response.error);
  } else {
    console.log("Success!");
  }
}
