import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import store from "./redux/store.js";
import {Provider} from "react-redux";
// Routes
import Home from "./router/Home/Home.jsx";
import GuideMaker from "./router/GuideMaker/GuideMaker.jsx";
// Components
import UserMenu from "./components/UserMenu/UserMenu.jsx";

function App(){
	useEffect(() => {
		
	}, [
		// getAssets("tiles", "*_0.jpg", setPathTiles)
	]);

	// Functions
	function removeParent(tag){
		tag.target.parentElement.remove();
	};

	return(<>
		<header>
			<div className="legal-boilerplate">
				<p>"Proyecto Wardear" no cuenta con el respaldo de Riot Games y no refleja los puntos de vista ni las opiniones de Riot Games ni de nadie involucrado oficialmente en la producción o administración de la propiedad de Riot Games. Riot Games y todas las propiedades asociadas son marcas comerciales o marcas comerciales registradas de Riot Games, Inc.</p>
				<input type="button" value="X" onClick={removeParent} />
			</div>
			<h1>Proyecto Wardear</h1>
			<UserMenu />
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
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// const [path_tiles, setPathTiles] = useState([]);

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

// <div className="tiles">
// 	{path_tiles.map((path, index) => <img key={`tile-${index}`} src={`/${path}`} alt="" />)}
// </div>