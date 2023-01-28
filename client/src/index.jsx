import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import store from "./redux/store.js";
import {Provider, useDispatch} from "react-redux";
// Routes
import Home from "./router/Home/Home.jsx";
import GuideMaker from "./router/GuideMaker/GuideMaker.jsx";
import GuideReader from "./router/GuideReader/GuideReader.jsx";
// Components
import UserMenu from "./components/UserMenu/UserMenu.jsx";

function App(){
	const dispatch = useDispatch();

	checkPlatform();

	// Functions
	function checkPlatform(){
		const regexp = /android|iphone|kindle|ipad/i;
		dispatch({
			type: "isMobile/set",
			payload: regexp.test(navigator.userAgent)
		});
	};
	function removeParent(tag){
		tag.target.parentElement.remove();
	};

	return(<>
		<img src="/static/assets/icon/project.svg" alt="" onClick={() => {dispatch({type: "isMenuShowed/toggle"})}} />
		<UserMenu />
		<header>
			<div className="legal-boilerplate">
				<input type="button" value="X" onClick={removeParent} />
				<p>"Proyecto Wardear" no cuenta con el respaldo de Riot Games y no refleja los puntos de vista ni las opiniones de Riot Games ni de nadie involucrado oficialmente en la producción o administración de la propiedad de Riot Games. Riot Games y todas las propiedades asociadas son marcas comerciales o marcas comerciales registradas de Riot Games, Inc.</p>
			</div>
			<h1>Proyecto Wardear</h1>
		</header>
		<main>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="GuideMaker" element={<GuideMaker />} />
					<Route exact path="GuideReader" element={<GuideReader />} />
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