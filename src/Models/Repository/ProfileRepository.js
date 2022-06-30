import pool from "../DatabasePool.js";

export const insertProfile = (data) => {
	const {id, name, grade, major, bio} = data;
	const sql = "INSERT INTO dataprofile (id_profile, name, grade, major, bio) VALUES (?, ?, ?, ?, ?);"

	pool.query(sql, [id, name, grade, major, bio], (err) => {
		console.log(err)
		if(err) throw err;
	})
};

export const updateProfileById = (data) => {
	const {name, grade, major, bio, id} = data;
	const sql = "UPDATE dataprofile SET name = ?, grade = ?, major = ?, bio = ? WHERE id_profile = ?;";

	pool.query(sql, [name, grade, major, bio, id], (err) => {
		if(err) throw err;
		console.log(err);
	})
}

export const getProfileById = (id) => {
	const sql = "SELECT * FROM dataprofile WHERE id_profile = ?;"

	return new Promise((resolve, reject) => {
		pool.query(sql, [id], (err, results) => {
			if (err){
				console.log(err);
				return reject(err);
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(results);
		})
	})
}
