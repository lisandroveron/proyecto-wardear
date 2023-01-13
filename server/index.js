const express = require("express");
const app = express();
const { join } = require("path");
const glob = require("glob");

app.use(express.json());
app.use(express.static(join(__dirname, "build")));
app.use("/assets", express.static(join(__dirname, "assets")));

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});