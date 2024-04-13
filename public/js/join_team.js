document.getElementById("select-club").addEventListener("change", loadTeams);
document.getElementById("join-team").addEventListener("click", joinTeam);
window.addEventListener("load", loadClubs);

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
    response.forEach((team) => {
      let option = document.createElement("option");
      if (team.user_in_team) {
        option.disabled = "true";
      }
      option.value = team.team_name;
      option.innerHTML = team.team_name;
      document.getElementById("select-team").appendChild(option);
    });
  }
}

async function joinTeam() {
  let club_id = document.getElementById("select-club").value;
  let team_name = document.getElementById("select-team").value;
  if (!team_name) {
    alert("Please select a team!");
  } else {
    let response = request("POST", { club_id: club_id, team_name: team_name }, "/club/team/join");
  }
}
