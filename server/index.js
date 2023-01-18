require("dotenv").config();
const express = require("express");
const {MongoClient} = require("mongodb");
const glob = require("glob");
const { join } = require("path");

const app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.DATABASE_URL);
// DATABASE
initDB().catch(console.error);
const db = client.db();
// DATABASE COLLECTIONS
const users = db.collection("users");

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});

app.use(express.json());
app.use(express.static(join(__dirname, "build")));
app.use("/static", express.static(join(__dirname, "static")));

// HTTP Endpoints
app.post("/login", (req, res) => {
	users.findOne({
		username: req.body.username,
		password: req.body.password,
	}).then(promise => {
		if(promise == null){
			res.send({"verified": false});
		}else{
			res.send({"verified": true});
		};
	});
});
app.post("/getAssets", (req, res) => {
	const resource = req.body.resource;
	const pattern = req.body.pattern;
	const results = [];

	glob(`static/assets/dragontail_lolassets/img/champion/${resource}/${pattern}`, (err, files) => {

		if(err){
			return console.error(err);
		}else{
			files.forEach(file => {
				results.push(file);
			});
		};
		res.send(results);
	});
});

// FUNCTIONS
async function initDB(){
	try{
		await client.connect();
	}catch(err){
		console.error(err);
	}finally{
		// await client.close();
	};
};