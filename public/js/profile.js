window.addEventListener("load", loadProfile);

async function loadProfile() {
  let response = await request("POST", {}, "/user/get-token-data");
  if (response.error) {
    document.getElementById("profile-error-display").innerHTML = response.error;
  } else {
    document.getElementById("username").innerHTML = response.rows[0].username;
    document.getElementById("first-name").innerHTML = response.rows[0].first_name;
    document.getElementById("last-name").innerHTML = response.rows[0].last_name;
    document.getElementById("email").innerHTML = response.rows[0].email;
    document.getElementById("phone").innerHTML = response.rows[0].phone_number;
  }
}
