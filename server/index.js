// Packages
require("dotenv").config();
const express = require("express");
const {MongoClient} = require("mongodb");
const glob = require("glob");
const { join } = require("path");

// Initializations
const app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.DATABASE_URL);
initDB().catch(console.error);
const db = client.db();

// DATABASE COLLECTIONS
const users = db.collection("users");
const guides = db.collection("guides");

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});

app.use(express.json());
app.use(express.static(join(__dirname, "build")));
app.use("/static", express.static(join(__dirname, "static")));

// HTTP Endpoints
app.post("/createguide", (req, res) => {
	const password = req.body.password;
	const username = req.body.username;
	const textarea = req.body.textarea;
	users.findOne({
		"username": username,
		"password": password,
	}).then(promise => {
		if(promise !== null){
			const guide = {};
			const section = [];
			const textareaMatched = textarea.match(/^#+.+(\n[^#]+)?/gmu);
			textareaMatched.forEach(item => {
				const separated = item.match(/.+/gmu);
				separated.forEach((item, index) => {
					if(item.startsWith("#")){
						const markLength = item.match(/^#+/gmu)[0].length;
						const title = item.slice(markLength+1);
						if(markLength === 1){
							guide.title = title;
							guide.description = separated[index+1];
						}
						section.push({
							"type": `h${markLength}`,
							"content": title
						});
					}else if(item.startsWith("--")){
						const markLength = item.match(/^-+/gmu)[0].length;
						const content = item.slice(markLength+1);
						section.push({
							"type": "li",
							"content": content
						});
					}else{
						section.push({
							"type": "p",
							"content": item
						})
					};
				});
			});
			guide.guide = section;
			const session = client.startSession();
			session.startTransaction();
			guides.insertOne(guide);
			users.updateOne({
				"password": password,
				"username": username,
			}, {$push: {
				guides: guide._id
			}});
			session.commitTransaction();
			session.endSession();
			res.send({
				"success": true,
				"textarea": textarea,
				"guide": guide,
			});
		}else{
			res.send({
				"success": false,
				"textarea": textarea,
			});
		};
	});
});
app.post("/getassets", (req, res) => {
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
app.post("/getsummary", (req, res) => {
	guides.find().sort({_id: -1}).limit(10).toArray()
		.then(promise => {
			res.send(promise);
		});
});
app.post("/login", (req, res) => {
	users.findOne({
		username: req.body.username,
		password: req.body.password,
	}).then(promise => {
		if(promise == null){
			res.send({"success": false});
		}else{
			res.send({"success": true});
		};
	});
});
app.post("/signup", (req, res) => {
	users.findOne({
		username: req.body.username,
		password: req.body.password,
	}).then(promise => {
		if(promise == null){
			const session = client.startSession();
			session.startTransaction();
			users.insertOne({
				"username": req.body.username,
				"password": req.body.password,
				"guides": [],
			});
			session.commitTransaction();
			session.endSession();
			res.send({
				"username": req.body.username,
				"password": req.body.password,
				"success": true
			});
		};
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