import express from "express";
import bodyParser from "body-parser";
import pool from "./src/Models/DatabasePool.js";
import routeUser from "./src/Api/UserApi.js"
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get("/", (req, res) => {
	res.send("hello");
})

app.use("/api/users", routeUser);

app.listen(3000, () => {
	console.log("Server run on port 3000");
})
