import {NavLink} from "react-router-dom";
import "./GuideCard.css";

export default function GuideCard(props){
	return(
	<article className="GuideCard">
		<NavLink to="GuideReader" state={{id: props.id}}>
			{props.title}
		</NavLink>
		<div></div>
		<p>{props.description}</p>
	</article>
	);
};