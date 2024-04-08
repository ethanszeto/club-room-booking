document.getElementById("query-button").addEventListener("click", query);

async function query() {
  let sql = document.getElementById("sql-query").value;
  const response = await request("post", { query: sql }, "/request");
  console.log(response);
}
