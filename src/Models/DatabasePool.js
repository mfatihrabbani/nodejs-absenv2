import mysql from "mysql2";

const pool = mysql.createPool({
	connectionLimit: 100,
	host: "localhost",
	user: "root",
	password: "root",
	database: "absenV2",
	debug: false,
});

pool.getConnection((err, connection) => {
	if (err) throw err;
	console.log("Databse Connected")
	connection.release();
});

export default pool;

