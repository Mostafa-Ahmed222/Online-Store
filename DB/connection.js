import mysql2 from "mysql2";
const sql = mysql2.createConnection({
    user: "root",
    password: "",
    database: "testone",
    host: "localhost", // 127.0.0.1 ==> Dns vs Domain
  });

export default sql