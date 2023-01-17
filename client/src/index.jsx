import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
// Routes
import Home from "./routes/Home/Home.jsx";
import GuideMaker from "./routes/GuideMaker/GuideMaker.jsx";
// Components

function App(){
	const [isLogged, setIsLogged] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const [path_tiles, setPathTiles] = useState([]);

	useEffect(() => {
		
	}, [
		// getAssets("tiles", "*_0.jpg", setPathTiles)
	]);

	// Functions
	// function getAssets(resource, pattern, updateFunction){
	// 	fetch("/getAssets", {
	// 		method: "POST",
	// 		headers: {'Content-Type': 'application/json'},
	// 		body: JSON.stringify({
	// 			"resource": resource,
	// 			"pattern": pattern
	// 		})
	// 	})
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			for(let path of data){
	// 				updateFunction(oldArray => [...oldArray, path]);
	// 			};
	// 		});
	// };
	function login(event){
		event.preventDefault();
		fetch("/login", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username,
				password,
			})
		})
			.then(response => response.json())
			.then(body => setIsLogged(body.verified));
	};
	function removeParent(tag){
		tag.target.parentElement.remove();
	};

	return(<>
		<header>
			<div className="legal-boilerplate">
				<p>"Proyecto Wardear" no cuenta con el respaldo de Riot Games y no refleja los puntos de vista ni las opiniones de Riot Games ni de nadie involucrado oficialmente en la producción o administración de la propiedad de Riot Games. Riot Games y todas las propiedades asociadas son marcas comerciales o marcas comerciales registradas de Riot Games, Inc.</p>
				<input type="button" value="X" onClick={removeParent} />
			</div>
			{isLogged
			?<p>Hello, {username}</p>
			:<form id="login" onSubmit={login}>
				<input type="text" name="user" onChange={(event) => {setUsername(event.target.value)}} />
				<input type="password" name="password" onChange={(event) => {setPassword(event.target.value)}} />
				<input type="submit" value="Iniciar sesión" />
			</form>
			}
			<h1>Proyecto Wardear</h1>
			{/*<div className="tiles">
				{path_tiles.map((path, index) => <img key={`tile-${index}`} src={`/${path}`} alt="" />)}
			</div>*/}
		</header>
		<main>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/GuideMaker" element={<GuideMaker />} />
				</Routes>
			</BrowserRouter>
		</main>
		<footer>
			<p>Proyecto Wardear © Todos los derechos reservados. 2023</p>
		</footer>
	</>);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);