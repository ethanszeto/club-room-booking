document.getElementById("select-club").addEventListener("change", loadTeams);
document.getElementById("select-team").addEventListener("change", loadMeetings);

window.addEventListener("load", loadClubs);

async function loadClubs() {
  let response = await request("POST", {}, "/user/get-clubs");
  if (response.error) {
    console.log(response.error);
    alert("Something went wrong.");
    window.location.href = "/user/profile";
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
    alert("Something went wrong.");
    window.location.href = "/user/profile";
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
  loadMeetings();
}

async function loadMeetings() {
  let clubId = document.getElementById("select-club").value;
  let teamName = document.getElementById("select-team").value;
  let response = await request("POST", { club_id: clubId, team_name: teamName }, "/meeting/get-meetings-by-team");
  document.getElementById("meeting-group-display").innerHTML = "";
  if (response.error) {
    console.log(response.error);
    alert("Something went wrong.");
    window.location.href = "/user/profile";
  } else {
    console.log(response);
    if (response.rows) {
      response.rows.forEach((meetingGroup) => {
        meetingDates = meetingGroup.meeting_dates.split(",");
        let meetingGroupDiv = document.createElement("div");
        meetingGroupDiv.classList.add("panel");

        let meetingGroupDatesDiv = document.createElement("div");
        meetingGroupDatesDiv.classList.add("meeting-group-div");

        let infoParagraph = document.createElement("p");
        infoParagraph.innerHTML = `Meeting in ${meetingGroup.building_name} (${meetingGroup.building_code}), room ${
          meetingGroup.room_number
        } from ${timeConversion(meetingGroup.start_time)} until ${timeConversion(
          meetingGroup.end_time
        )}. <br /> <br /> Booked by ${meetingGroup.first_name} ${meetingGroup.last_name}.`;
        meetingGroupDiv.appendChild(infoParagraph);

        let form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", "/meeting/delete-meeting");

        let inputRoomId = document.createElement("input");
        let inputStartTime = document.createElement("input");
        let inputEndTime = document.createElement("input");
        let inputGroupStartDate = document.createElement("input");
        let inputSubmit = document.createElement("input");

        inputRoomId.setAttribute("name", "room_id");
        inputStartTime.setAttribute("name", "start_time");
        inputEndTime.setAttribute("name", "end_time");
        inputGroupStartDate.setAttribute("name", "group_start_date");

        inputRoomId.setAttribute("value", meetingGroup.room_id);
        inputStartTime.setAttribute("value", meetingGroup.start_time);
        inputEndTime.setAttribute("value", meetingGroup.end_time);
        inputGroupStartDate.setAttribute("value", meetingGroup.start_date);

        inputRoomId.setAttribute("type", "hidden");
        inputStartTime.setAttribute("type", "hidden");
        inputEndTime.setAttribute("type", "hidden");
        inputGroupStartDate.setAttribute("type", "hidden");

        inputSubmit.setAttribute("type", "submit");
        inputSubmit.setAttribute("value", "Delete Meetings");
        inputSubmit.classList.add("btn");

        form.appendChild(inputRoomId);
        form.appendChild(inputStartTime);
        form.appendChild(inputEndTime);
        form.appendChild(inputGroupStartDate);
        form.appendChild(inputSubmit);

        meetingGroupDiv.appendChild(form);

        let breaker = document.createElement("hr");
        meetingGroupDiv.appendChild(breaker);

        meetingDates.forEach((date) => {
          let dateBlock = document.createElement("div");
          let dateText = document.createElement("p");
          dateText.innerHTML = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toDateString();
          dateBlock.classList.add("date-panel");
          dateBlock.appendChild(dateText);
          meetingGroupDatesDiv.appendChild(dateBlock);
        });
        meetingGroupDiv.appendChild(meetingGroupDatesDiv);

        document.getElementById("meeting-group-display").appendChild(meetingGroupDiv);
      });
    }
  }
}

function timeConversion(time24) {
  // Splitting the time string into hours and minutes
  var timeParts = time24.split(":");
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);

  // Determining AM or PM
  var period = hours >= 12 ? "PM" : "AM";

  // Converting hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // '0' should be converted to '12'

  // Adding leading zeros to minutes if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Forming the 12-hour time string
  var time12 = hours + ":" + minutes + " " + period;

  return time12;
}
