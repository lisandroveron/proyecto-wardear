import "./GuideCard.css";

export default function GuideCard(props){
	return(
	<article className="GuideCard">
		<h3>{props.title}</h3>
		<div></div>
		<p>{props.description}</p>
	</article>
	);
};