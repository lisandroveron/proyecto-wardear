import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

function App(){
	const [ready, setReady] = useState(false);
	const [path_tiles, setPathTiles] = useState([]);

	useEffect(() => {
		fetch("/getTiles")
			.then(response => response.json())
			.then(data => {
				for(let path of data){
					setPathTiles(oldArray => [...oldArray, path]);
				};
				setReady(true);
			});
	}, []);

	// Functions
	function removeParent(tag){
		tag.target.parentElement.remove();
	};

	if(!ready){
		return(<p>Cargando...</p>);
	}else{
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
		</>);
	};
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);