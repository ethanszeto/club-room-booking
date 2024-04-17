document.getElementById("select-club").addEventListener("change", loadTeams);

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
  loadMeetings();
}

async function loadMeetings() {
  let clubId = document.getElementById("select-club").value;
  let teamName = document.getElementById("select-club").value;
  let response = await request("POST", { club_id: clubId, team_name: teamName }, "/meeting/get-meetings-by-team");

  if (response.error) {
    console.log(response.error);
  } else {
    if (response.rows) {
      response.rows.forEach(() => {});
    }
  }
}
