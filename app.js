//nama gilang ashari abimanyu
//nim 119140040

const express = require("express");
const bodyParser = require("body-parser");
const koneksi = require("./config/database");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//POST
app.post("/api/data", (req, res) => {
  const data = { ...req.body };
  const querySql = "INSERT INTO data SET ?";
  koneksi.query(querySql, data, (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal masukkan data!", error: err });
    }
    res.status(201).json({ success: true, message: "Berhasil masukkan data!" });
  });
});
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
//GET
app.get("/api/data", (req, res) => {
  const querySql = "SELECT * FROM data";
  koneksi.query(querySql, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Ada kesalahan", error: err });
    }
    res.status(200).json({ success: true, data: rows });
  });
});
//UPDATE
app.put("/api/data/:id", (req, res) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM data WHERE id = ?";
  const queryUpdate = "UPDATE data SET ? WHERE id = ?";
  koneksi.query(querySearch, req.params.id, (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Ada kesalahan pada data", error: err });
    }
    if (rows.length) {
      koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Ada kesalahan pada data", error: err });
        }
        res
          .status(200)
          .json({ success: true, message: "Berhasil update data!" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Data tidak ditemukan!", success: false });
    }
  });
});
//DELETE
// delete data
app.delete("/api/data/:id", (req, res) => {
  const querySearch = "SELECT * FROM data WHERE id = ?";
  const queryDelete = "DELETE FROM data WHERE id = ?";
  koneksi.query(querySearch, req.params.id, (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Ada kesalahan pada data", error: err });
    }
    if (rows.length) {
      koneksi.query(queryDelete, req.params.id, (err, rows, field) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Ada kesalahan pada data", error: err });
        }
        res
          .status(200)
          .json({ success: true, message: "Berhasil menghapus data!" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Data tidak ditemukan!", success: false });
    }
  });
});
