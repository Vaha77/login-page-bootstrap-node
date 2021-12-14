const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const app = express();
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config({ path: "./.env" });
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: "root",
  password: "",
  database: "node-logins",
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL connect...");
  }
});
// app.get("/", (req, res) => {
//   res.render("index");
// });
// app.get("/", (req, res) => {
//   res.send("<h1>Hi world</h1>");
// });

app.use("/", require("./routes/page"));
app.use("/auth", require("./routes/auth"));

app.listen(3000, () => {
  console.log("Server has been started on 3000...");
});
