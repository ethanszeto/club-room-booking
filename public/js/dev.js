document.getElementById("query-button").addEventListener("click", () => {
  let sql = document.getElementById("sql-query").value.replace(/\n/g, " ");
  request("post", { query: sql }, "/request");
});
