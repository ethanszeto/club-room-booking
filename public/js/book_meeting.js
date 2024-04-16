document.getElementById("select-club").addEventListener("change", loadTeams);
document.getElementById("select-team").addEventListener("change", loadRoomTypes);
document.getElementById("select-room-type").addEventListener("change", loadBuildings);
document.getElementById("select-building").addEventListener("change", loadRooms);
document.getElementById("select-meeting-type").addEventListener("change", changeMeetingDateOptions);

document.getElementById("select-room").addEventListener("change", loadAvailabilities);
document.getElementById("select-room").addEventListener("change", loadAvailabilities);
document.getElementById("select-room").addEventListener("change", loadAvailabilities);
document.getElementById("select-room").addEventListener("change", loadAvailabilities);
document.getElementById("select-room").addEventListener("change", loadAvailabilities);
document.getElementById("select-room").addEventListener("change", loadAvailabilities);

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
  // start end room id
  let state = document.getElementById("select-meeting-type").value;
  document.getElementById("date-select-content").innerHTML = "";
  let startDate, endDate, weekday;
  if (state == "single") {
    startDate = document.getElementById();
  }
}

function changeMeetingDateOptions() {
  let state = document.getElementById("select-meeting-type").value;
  document.getElementById("date-select-content").innerHTML = "";
  if (state == "single") {
    let dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "select-date");
    let dateLabel = document.createElement("p");
    dateLabel.innerHTML = "Select Date:";
    document.getElementById("date-select-content").appendChild(dateLabel);
    document.getElementById("date-select-content").appendChild(dateInput);
    document.getElementById("select-weekday-content").style.display = "none";
  } else {
    let dateStartInput = document.createElement("input");
    dateStartInput.setAttribute("type", "date");
    dateStartInput.setAttribute("id", "select-start-date");
    let startLabel = document.createElement("p");
    startLabel.innerHTML = "Select Start Date:";
    document.getElementById("date-select-content").appendChild(startLabel);
    document.getElementById("date-select-content").appendChild(dateStartInput);

    let dateEndInput = document.createElement("input");
    dateEndInput.setAttribute("type", "date");
    dateEndInput.setAttribute("id", "select-end-date");
    let endLabel = document.createElement("p");
    endLabel.innerHTML = "Select End Date:";
    document.getElementById("date-select-content").appendChild(endLabel);
    document.getElementById("date-select-content").appendChild(dateEndInput);

    document.getElementById("select-weekday-content").style.display = "block";
  }
}

function generateMeetingDates(startDate, endDate, dayOfWeek) {
  const dates = [];
  let currentDate = new Date(startDate);

  // Loop through dates between start and end dates
  while (currentDate <= endDate) {
    if (currentDate.getDay() === dayOfWeek) {
      dates.push(new Date(currentDate)); // Add the date if it matches the specified day of week
      currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
    }
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day if before day of week
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
  let response = await request("POST", { start_date: dateSlotStart, end_date: dateSlotEnd, room_id: roomId }, "/meeting/get");
  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    if (response.rows) {
      return;
    }

    let invalid = false;

    response.rows.forEach((meeting) => {
      let meeting_date = meeting.meeting_date;
      let start_time = meeting.start_time;
      let end_time = meeting.end_time;

      console.log(meeting_date == date);

      mtbDates.forEach((date) => {
        if (meeting_date == date && start_time < mtbEndTime && end_time > mtbStartTime) {
          document.getElementById("error-display").innerHTML = "Invalid timeslots - already booked";
          invalid = true;
        }
      });
    });

    if (!invalid) {
      //book it
    }
  }
  await loadTeams();
}
