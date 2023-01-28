import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";

export default function GuideReader(props){
	const [guide, setGuide] = useState([]);
	const state = useLocation().state;

	useEffect(() => {
		fetch("/getguide", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				"id": state.id,
			}),
		})
			.then(response => response.json())
			.then(data => {
				setGuide(data);
			});
	}, [state]);

	return(<article>
		<NavLink to="/" className="router">←</NavLink>
		{
		guide.map((item, index) => React.createElement(
			`${item.type}`,
			{key: `guide_element-${index}`},
			`${item.content}`)
		)
		}
	</article>);
};