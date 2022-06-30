import bcrypt from "bcrypt";
import {createUser, 
		getUserByEmail, 
		getUserByUsername,
		getUserByEmailOrUsername
} from "../Models/Repository/UserRepository.js";
import jwt from "jsonwebtoken";

function generateID(){
    return new Date().getTime() * Math.random() * 100000;
}

export const insertUser = async (req, res) => {
	try{
		const {username, email, password, confirmPassword} = req.body;

		const resultEmail = await getUserByEmail(email);
		const resultUsername = await getUserByUsername(username);

		if(!email || !username) return res.status(404).json({messsage: "Please input data"});

		if(resultUsername.length != 0) return res.status(404).json({messsage: "Username already used"});
		if(resultEmail.length != 0) return res.status(404).json({messsage: "Email already used"});

		if(password.length < 8 || !password) return res.status(404).json("Please check your password");
		if(password != confirmPassword) return res.status(404).json({messsage: "Password doesnt match"});

		const hashPassword = await bcrypt.hash(password, 10);

		const data = {
			id : generateID(),
			username,
			email,
			password: hashPassword
		}

		createUser(data);

		res.status(200).json({
			code: 200,
			status: "Success",
			data: data
		})
	}catch(err){
		return res.status(400).json({
			code: 400,
			status: "Failed",
			messsage: "Failed Registration"
		});
		console.log(err);
	}
	
}

export const loginUser = async (req, res) => {
	try{
		var {emailOrUsername, password} = req.body;

		const data = {
			emailOrUsername,
			passwordInput: password
		};

		console.log(data)

		const result = await getUserByEmailOrUsername(emailOrUsername);

		if(result.length == 0) return res.status(404).json({messsage: "Please check again input"});

		var {id, username, email, password} = result[0];

		console.log(id);

		const checkPassword = await bcrypt.compare(data.passwordInput, password);

		if(!checkPassword) return res.status(404).json({messsage: "Password incorrect"});

		const token = jwt.sign({
			id,
			username,
			email
		}, "rahasia");

		res.cookie("Authorization", "Bearer " + token, {
			httpOnly: true
		});


		res.status(200).json({
			code: 200,
			status: "Success",
			data: token
		})


	}catch(err){
		return res.status(404).json({
			code: 404,
			status: "Failed",
			messsage: "Failed Login"
		})

	}

}

export const renderHome = (req, res) => {
	const {username, email} = req.user;

	res.render("../Views/HTML/HomePage.ejs", {
		title: `Home -${username}`,
		username,
		email
	})
}

export const renderLogin = (req, res) => {
	res.render("../Views/HTML/LoginPage.ejs", {
		title: "Sign In"
	});
}

export const renderRegister = (req, res) => {
	res.render("../Views/HTML/RegisterPage.ejs", {
		title: "Sign Up"
	});
}