import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
	const token = req.cookies['Authorization'];

	if(!token) return res.status(400).json({messsage: "Token Empty"});
	
	try{
		console.log(token);
		const decoded = verifyToken(token);
		console.log(decoded)
		req.user = decoded;
		next();
	}catch(error){
		console.log(error);
		return res.status(400).json({
			code: 400,
			status: "Failed",
			messsage: "Failed to verify"
		})
	}

	
}

const verifyToken = (token) => {
	if(!token) return res.status(400).send("Empty Token");

	console.log(token)

	const authSplit = token.split(" ");

	const [authType, authToken] = [authSplit[0], authSplit[1]];

	if(authType !== "Bearer") return res.status(400).send("Invalid Token");

	const result = jwt.verify(authToken, "rahasia");

	return result;

}