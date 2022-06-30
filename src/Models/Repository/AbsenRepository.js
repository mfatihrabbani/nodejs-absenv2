import pool from "../DatabasePool.js";

export const insertAbsen = (data) => {
	const {id, date, status, time} = data;
	const sql = "INSERT INTO dataabsen (id_absen, dateAbsen, timeAbsen, statusAbsen, status) VALUES (?, ?, ?, ?, ?);"

	pool.query(sql, [id, date, time, "Yes", status], (err) => {
		console.log(err);
		if(err) throw err;
	})
}

export const getAbsenByIdAndDate = (data) => {
	const {id, date} = data;
	const sql = "SELECT * from dataabsen WHERE id_absen = ? AND dateAbsen = ?"

	return new Promise((resolve, reject) => {
		pool.query(sql, [id, date], (err, results) => {
			if(err){
				console.log(err);
				return reject(err)
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(results);
		})
	})
}