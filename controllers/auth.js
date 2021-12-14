const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: "root",
  password: "",
  database: "node-logins",
});
exports.register = (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  db.query(
    "SELECT email FROM users WHARE email =? ",
    [email],
    async (eror, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "that email is alrediy taken",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "password do not match",
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
    }
  );
};
