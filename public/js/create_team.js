window.addEventListener("load", loadClubs);
document.getElementById("create-team").addEventListener("click", createTeam);

async function loadClubs() {
  let response = await request("POST", {}, "/user/get-clubs");

  if (response.error) {
    document.getElementById("get-club-error-display").innerHTML = response.error;
  } else {
    console.log(response);
    response.rows.forEach((club) => {
      let option = document.createElement("option");
      option.value = club.club_id;
      option.innerHTML = club.club_name;
      document.getElementById("select-club").appendChild(option);
    });
  }
}

async function createTeam() {
  let club_id = document.getElementById("select-club").value;
  let team_name = document.getElementById("team-name").value;

  let response = await request("POST", { name: team_name, club_id: club_id }, "/club/team/create");
  if (response.error) {
    document.getElementById("get-club-error-display").innerHTML = "Failed to create team. Try again.";
  } else {
    console.log("success");
  }
}
