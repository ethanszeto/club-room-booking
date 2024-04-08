document.getElementById("query-button").addEventListener("click", query);
window.addEventListener("keypress", (e) => {
  if (e.key == "`") {
    if (document.getElementById("dev").style.display == "none") {
      document.getElementById("dev").style.display = "block";
    } else {
      document.getElementById("dev").style.display = "none";
    }
  }
});

async function query() {
  let sql = document.getElementById("sql-query").value;
  const response = await request("post", { query: sql }, "/request");
  console.log(response);
}
