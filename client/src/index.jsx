import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

function App(){
	const [path_tiles, setPathTiles] = useState([]);

	useEffect(() => {
		getAssets("tiles", "*_0.jpg", setPathTiles);
	}, []);

	// Functions
	function getAssets(resource, pattern, updateFunction){
		fetch("/getAssets", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				"resource": resource,
				"pattern": pattern
			})
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				for(let path of data){
					updateFunction(oldArray => [...oldArray, path]);
				};
			});
	};
	function removeParent(tag){
		tag.target.parentElement.remove();
	};

	return(<>
		<header>
			<section className="legal-boilerplate">
				<p>"Proyecto Wardear" no cuenta con el respaldo de Riot Games y no refleja los puntos de vista ni las opiniones de Riot Games ni de nadie involucrado oficialmente en la producción o administración de la propiedad de Riot Games. Riot Games y todas las propiedades asociadas son marcas comerciales o marcas comerciales registradas de Riot Games, Inc.</p>
				<input type="button" value="X" onClick={removeParent} />
			</section>
			<h1>Proyecto Wardear</h1>
			<section className="tiles">
				{path_tiles.map((path, index) => <img key={`tile-${index}`} src={`/${path}`} alt="" />)}
			</section>
		</header>
		<main></main>
	</>);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);