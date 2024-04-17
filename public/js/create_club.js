document.getElementById("create-club").addEventListener("click", createClub);

async function createClub() {
  clubName = document.getElementById("club-name").value;
  let response = await request("POST", { club_name: clubName }, "/club/create");
  if (response.error) {
    console.log(response.error);
    alert("Something went wrong. Try a different club name.");
    window.location.href = "/";
  } else {
    document.getElementById("create-club-message").innerHTML = "Successfully created club!";
    document.getElementById("club-name").value = "";
  }
}
