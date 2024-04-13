document.getElementById("approve-users").addEventListener("click", sendUpdatedTeamRequests);
window.addEventListener("load", loadRequestsToTeam);

async function loadRequestsToTeam() {
  let response = await request("POST", {}, "/club/team/get-user-team-requests");
  if (response.error) {
    console.error(response.error);
  } else {
    console.log(response);
    let teams = response.rows;
    if (teams) {
      for (let i = 0; i < teams.length; i++) {
        let user_block = document.createElement("div");
        user_block.classList.add("user-block");

        let approve_user_radio = document.createElement("input");
        approve_user_radio.type = "radio";
        approve_user_radio.name = `approval${i}`;
        approve_user_radio.value = `
          {"approval": true, "user_id": ${teams[i].user_id}, "club_id": "${teams[i].club_id}", "team_name": "${teams[i].team_name}"}
        `;
        approve_user_radio.classList.add("selection");

        let deny_user_radio = document.createElement("input");
        deny_user_radio.type = "radio";
        deny_user_radio.name = `approval${i}`;
        deny_user_radio.value = `
          {"approval": false, "user_id": ${teams[i].user_id}, "club_id": "${teams[i].club_id}", "team_name": "${teams[i].team_name}"}
        `;
        deny_user_radio.classList.add("selection");

        let selection_label = document.createElement("label");
        selection_label.for = `approval${i}`;
        selection_label.innerHTML = `
          ${teams[i].first_name} ${teams[i].last_name} (${teams[i].email}) 
          requested to join ${teams[i].team_name} at ${teams[i].club_name}
        `;

        user_block.appendChild(approve_user_radio);
        user_block.appendChild(deny_user_radio);
        user_block.appendChild(selection_label);

        document.getElementById("users-display").appendChild(user_block);
        document.getElementById("users-display").appendChild(document.createElement("br"));
      }
    }
  }
}

async function sendUpdatedTeamRequests() {
  let selections = Array.from(document.getElementsByClassName("selection"));
  let jsonSelections = [];
  selections.forEach((selection) => {
    if (selection.checked) jsonSelections.push(JSON.parse(selection.value));
  });
  console.log(jsonSelections);
  let response = await request("POST", { updates: jsonSelections }, "/club/team/post-user-team-updates");
  if (response.error) {
    console.error(response.error);
  } else {
    window.location.href = "/user/approve";
  }
}
