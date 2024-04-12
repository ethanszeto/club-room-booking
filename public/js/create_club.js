document.getElementById("create-club").addEventListener("click", createClub);

async function createClub() {
  clubName = document.getElementById("club-name").value;
  await request("POST", { club_name: clubName }, "/club/create");
}
