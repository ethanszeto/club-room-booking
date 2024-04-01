document.getElementById("connect-button").addEventListener("click", () => {
  let username = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;
  request("POST", { username: username, password: password }, "/connect");
  document.getElementById("input-username").value = "";
  document.getElementById("input-password").value = "";
});
