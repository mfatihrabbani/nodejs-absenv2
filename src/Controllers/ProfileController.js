import {insertProfile,
		getProfileById,
		updateProfileById
} from "../Models/Repository/ProfileRepository.js";


export const postProfile = async (req, res) => {
	try{ 
		const {name, grade, major, id, bio} = req.body;

		const data = {
			id,
			name,
			grade,
			major,
			bio
		}

		console.log(data)

		const check = await getProfileById(id);

		console.log(check)

		if(check.length != 0) return res.status(400).json({messsage: "You already make profile"});

		console.log("Insert data")
		insertProfile(data);

		console.log("failed")

		res.status(200).json({
			code: 200,
			status: "Success",
			data: data
		})
	}catch(err){
		console.log(err)
		res.status(404).json({
			code: 404,
			status: "Failed Create"
		})
	}
};

export const updateProfile = (req, res) => {
	try{

		const {name, grade, major, id, bio} = req.body;
		console.log(name)
		const data = {
			id,
			name,
			grade,
			major,
			bio
		}

		console.log(data)

		updateProfileById(data);

		res.status(200).json({
			code: 200,
			status: "Success",
			data: data
		})
	}catch(err){
		console.log(err)
		res.status(404).json({
			code: 404,
			status: "Failed Update"
		})
	}
};

export const getProfile = async (req, res) => {
	try{
		const {id} = req.params;

		const result = await getProfileById(id);

		if(result.length == 0) return res.status(404).json({messsage: "No one data with that id"});

		res.status(200).json({
			code: 200,
			status: "Success Get",
			data: result
		})

	}catch(err){

	}
}

export const renderMyProfile = async (req, res) => {
	try{
		const {id, username} = req.user;
		var status = "Empty";

		console.log("auth" + id);

		const result = await getProfileById(id)

		if(result.length != 0){
			const {name, grade, major, bio} = result[0];
			var status = "Created"
			console.log(name)

			return res.render("../Views/HTML/MyProfilePage.ejs", {
				title: username,
				idRes : id,
				nameRes : name,
				gradeRes : grade,
				majorRes : major,
				bioRes : bio,
				status
			})
		}

		res.render("../Views/HTML/MyProfilePage.ejs", {
			title: username,
			idRes : id,
			nameRes : null,
			gradeRes : null,
			majorRes : null,
			bioRes : null,
			status
		})


	}catch(error){
		console.log(error);
		return res.status(400).json({
			code : 400,
			status: "Failed Render"
		})
	}
	
}

export const renderUpdateProfile = async (req, res) => {
	try{
		const {id, username} = req.user;

		const result = await getProfileById(id);

		if(result.length == 0) return res.redirect("/myprofile");

		const {name, grade, major, bio} = result[0];

		res.render("../Views/HTML/UpdateProfilePage.ejs", {
			title : username,
			id,
			name,
			grade,
			major,
			bio
		})

	}catch(error){
		console.log(error);
		return res.status(400).json({
			code : 400,
			status: "Failed Render"
		})
	}

}

export const renderProfile = async (req, res) => {
	try{
		const {id} = req.params;

		const result =  await getProfileById(id);

		if(result.length == 0) return res.status(404).json({messsage: "No one data with the id please check id again"});

		const {name, grade, major, bio} = result[0];

		res.render("../Views/HTML/ProfilePage.ejs", {
			name,
			grade,
			major,
			bio
		})

	}catch(error){

	}
}