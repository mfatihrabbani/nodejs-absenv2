import express from "express";
import {insertAbsen, getAbsenByIdAndDate} from "../Models/Repository/AbsenRepository.js";
import {getProfileById} from "../Models/Repository/ProfileRepository.js";
const generateDate = () => {
	const date = new Date();

	const resultTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	const resultDate = `${date.getDay()}:${date.getMonth() + 1}:${date.getFullYear()}`;
	
	const result = {
		hours : date.getHours(),
		resultTime,
		resultDate
	}

	return result;
}


export const postAbsen = async (req, res) => {
	try{
			const {id} = req.user;

		let status = "Pass";

		const time = generateDate();

		const checkAlreadyAbsen = await getAbsenByIdAndDate(id, time.resultDate);

		if(checkAlreadyAbsen.length != 0) return res.status(400).json({messsage: "You already Absen"});

		if(time.hours > 11) status = "Late";

		const data = {
			id,
			date : time.resultDate,
			time : time.resultTime,
			status
		}
		console.log(data)

		insertAbsen(data);

		res.status(200).json({code: 200, status: "Success", data: data})
	}catch(err){
		console.log(err)
		res.status(400).json({code : 400, status: "Failed Absen"})
	}

}

export const renderAbsen = async (req, res) => {
	const {id} = req.user;

	var status = "Empty";

	const time = generateDate();

	const checkProfile = await getProfileById(id);


	if(checkProfile.length == 0) res.redirect("/myprofile");

	const data = {
		id,
		date : time.resultDate
	}

	const checkStatus = await getAbsenByIdAndDate(data);

	if(checkStatus.length != 0) status = "Absen";

	res.render("../Views/HTML/AbsenPage.ejs", {
		title: "Absen",
		status,
	}) 

}