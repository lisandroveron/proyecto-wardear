const express = require("express");
const app = express();
const { join } = require("path");
const glob = require("glob");

app.use("/assets", express.static(join(__dirname, "assets")));

app.get("/getTiles", (req, res) => {
	glob("assets/dragontail_lolassets/img/champion/tiles/*_0.jpg", (err, files) => {
		let results = [];

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

const process = require("process");
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});