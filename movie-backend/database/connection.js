const sql = require("mysql2");

const conn = sql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "alhamdu",
	database: "movie",
});
module.exports = conn;
