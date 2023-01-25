import {useState} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

export default function GuideMaker(){
	const isLogged = useSelector(state => state.isLogged.value);
	const [content, setContent] = useState("");
	const [guideCreated, setGuideCreated] = useState(false);

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
				data.success && setGuideCreated(data.success);
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
			{
			guideCreated && <p>Guía creada con éxito.</p>
			}
		</>
		: <p>Tienes que iniciar sesión para crear una guía.</p>
		}
	</>)
};

/*
import React, {useState} from "react";

const [guide, setGuide] = useState([]);

setGuide(data.guide.post);

<article>
{
	guide.map((item, index) => 
		React.createElement(
			`${item.type}`,
			{key: `section-${index}`},
			`${item.content}`
		)	
	)
}
</article>
*/