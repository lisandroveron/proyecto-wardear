import {useState} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

export default function GuideMaker(){
	const isLogged = useSelector(state => state.isLogged.value);
	const [content, setContent] = useState("");

	function createGuide(event){
		event.preventDefault();
		fetch("/createguide", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				"textarea": content
			})
		})
			.then(response => response.json())
			.then(data => {
				setContent(data.textarea);
			});
	};

	return(<>
		<NavLink to="/" className="router">←</NavLink>
		<h2>Creador de guías</h2>
		{
		isLogged
		? <>
			<form onSubmit={createGuide}>
				<textarea name="content" cols="30" rows="10" value={content} onChange={(event) => setContent(event.target.value)}></textarea>
				<input type="submit" value="Guardar" />
			</form>
		</>
		: <p>Tienes que iniciar sesión para crear una guía.</p>
		}
	</>)
};