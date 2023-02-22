// Packages
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const forge = require("node-forge");
const {MongoClient, ObjectId} = require("mongodb");
const { join } = require("path");

// Initializations
const app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.DATABASE_URL);
initDB().catch(console.error);
const db = client.db();
app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});

// Database collections
const users = db.collection("users");
const guides = db.collection("guides");
const sessions = db.collection("sessions");

// Middlewares
app.use(express.json());
app.use(express.static(join(__dirname, "build")));
app.use("/static", express.static(join(__dirname, "static")));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		client,
		collectionName: "sessions",
		crypto: {
			secret: process.env.SESSION_SECRET,
			iv_size: 32,
			at_size: 32,
		},
	}),
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		sameSite: "strict",
		secure: "auto",
	},
	name: "spw",
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(verify));
passport.serializeUser((user, callback) => callback(null, user._id));
passport.deserializeUser((userId, callback) => {
	users.findOne({"_id": new ObjectId(userId)})
		.then(user => callback(null, user))
		.catch(error => callback(error));
});

// HTTP Endpoints
app.post("/createguide", (req, res) => {
	const textarea = req.body.textarea;
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
	const mongoSession = client.startSession();
	mongoSession.startTransaction();
	guides.insertOne(guide);
	users.updateOne({_id: req.user._id}, {$push: {
		guides: guide._id
	}});
	mongoSession.commitTransaction();
	mongoSession.endSession();
	res.send({
		"success": true,
		"textarea": textarea,
		"guide": guide,
	});
});
app.post("/getguide", (req, res) => {
	guides.findOne({"_id": new ObjectId(req.body.id)})
		.then(guide => {
			res.send(guide.guide);
		});
});
app.post("/getsummary", (req, res) => {
	guides.find().sort({_id: -1}).limit(10).toArray()
		.then(promise => {
			summary = [];
			promise.forEach(item => {
				summary.push({
					"description": item.description,
					"id": item._id,
					"title": item.title,
				});
			});
			res.send(summary);
		});
});
app.post("/login", passport.authenticate("local"), (req, res) => {
	req.isAuthenticated()
	? res.send({"isLogged": true})
	: res.send({"isLogged": false});
});
app.post("/logout", (req, res) => {
	req.logout(() => {
		req.session.destroy()
		res.send({"isLogged": false});
	});
});
app.post("/signup", (req, res) => {
	users.findOne({
		username: req.body.username,
	}).then(promise => {
		if(promise == null){
			const salt = forge.random.getBytesSync(256);
			const passwordEncrypted = forge.pkcs5.pbkdf2(
				req.body.password,
				salt,
				1,	// Iteration number
				32,	// 32 bytes length
			);
			const mongoSession = client.startSession();
			mongoSession.startTransaction();
			users.insertOne({
				"username": req.body.username,
				"password": passwordEncrypted,
				"salt": salt,
				"guides": [],
			});
			mongoSession.commitTransaction();
			mongoSession.endSession();
			res.send({
				"success": true,
			});
		}else{
			res.send({
				"success": false,
			});
		};
	});
});

// Functions
async function initDB(){
	try{
		await client.connect();
	}catch(err){
		console.error(err);
	}finally{
		// await client.close();
	};
};
function verify(username, password, callback){
	users.findOne({username: username})
		.then(user => {
			if(user === null){
				callback(null, false)
			}else{
				const passwordEncrypted = forge.pkcs5.pbkdf2(
					password,	// Plain text password
					user.salt,	// Salt stored in database
					1,	// Iteration number
					32,	// 32 bytes length
				);
				const isValid = user.password === passwordEncrypted;
				isValid
				? callback(null, user)
				: callback(null, false);
			}
		})
		.catch(error => callback(error));
};