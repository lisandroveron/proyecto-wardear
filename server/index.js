require("dotenv").config();
const express = require("express");
const {MongoClient} = require("mongodb");
const glob = require("glob");
const { join } = require("path");

const app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.DATABASE_URL);
initDB().catch(console.error);
const db = client.db();

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});

app.use(express.json());
app.use(express.static(join(__dirname, "build")));
app.use("/assets", express.static(join(__dirname, "assets")));

// HTTP METHODS
app.post("/getAssets", (req, res) => {
	const resource = req.body.resource;
	const pattern = req.body.pattern;
	const results = [];

	glob(`assets/dragontail_lolassets/img/champion/${resource}/${pattern}`, (err, files) => {

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

// DATABASE
const users = db.collection("users");

// FUNCTIONS
async function initDB(){
	try{
		await client.connect();
	}catch(err){
		console.error(err);
	}finally{
		await client.close();
	};
};