import pool from "../DatabasePool.js";

export const createUser = (data) => {
	const {id, username, email, password} = data;
	const sql = "INSERT INTO datauser (id, username, email, password) VALUES(?, ? , ?, ?);";
	pool.query(sql,[id, username, email, password], (err) => {
		if (err) throw err;
	})
};

export const getUserByEmail = (email) => {
	const sql = "SELECT * FROM datauser WHERE email = ?;";

	return new Promise((resolve, reject) => {
		pool.query(sql, [email], (err, results) => {
			if (err){
				console.log(err);
				return reject(err);
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(result);
		})
	})
};

export const getUserByUsername = (username) => {
	const sql = "SELECT * FROM datauser WHERE username = ?;";

	return new Promise((resolve, reject) => {
		pool.query(sql, [username], (err, results) => {
			if (err){
				console.log(err);
				return reject(err);
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(result);
		})
	})
};

export const getUserByEmailOrUsername = (data) => {
	const sql = "SELECT id, username, email, password FROM datauser WHERE email = ? OR username = ?;";

	return new Promise((resolve, reject) => {
		pool.query(sql, [data, data], (err, results) => {
			if (err){
				console.log(err);
				return reject(err);
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(result);
		})
	})
};