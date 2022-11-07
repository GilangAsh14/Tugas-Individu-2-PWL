//nama gilang ashari abimanyu
//nim 119140040
const mysql = require("mysql");
const koneksi = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tugas2individupwl",
  multipleStatements: true,
});
koneksi.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});
module.exports = koneksi;
