import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import pool from "./Models/DatabasePool.js";
import apiUser from "./Api/UserApi.js"
import apiProfile from "./Api/ProfileApi.js";
import apiAbsen from "./Api/AbsenApi.js";
import routerUser from "./RouterPage/RouterPage.js"
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
	res.send("hello");
})

app.use("/", routerUser);


app.use("/api/users", apiUser);
app.use("/api/profile", apiProfile);
app.use("/api/absen", apiAbsen);

app.listen(3000, () => {
	console.log("Server run on port 3000");
})
