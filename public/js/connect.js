document.getElementById("connect-button").addEventListener("click", async () => {
  let username = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;
  let response = await request("POST", { username: username, password: password }, "/connect");
  if (response.error) {
    document.getElementById("connection-error-display").innerHTML = response.error;
  } else {
    window.location.href = "http://localhost:5200/user/login";
  }
  document.getElementById("input-username").value = "";
  document.getElementById("input-password").value = "";
});
