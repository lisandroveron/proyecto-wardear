import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import GuideCard from "../../components/GuideCard/GuideCard.jsx";
import "./Home.css";

export default function Home(){
	const [guideDescription, setGuideDescription] = useState([]);

	useEffect(() => {
		fetch("/getsummary", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
		})
			.then(response => response.json())
			.then(description => {
				setGuideDescription(description);
			});
	}, []);

	return(
	<section>
		<h2>Guías</h2>
		<div className="search">
			<input type="search" />
			<NavLink to="/GuideMaker" className="router">+</NavLink>
		</div>
		{
		guideDescription.map((item, index) => 
			<GuideCard 
				title={item.title} 
				description={item.description} 
				key={`GuideCard-${index}`} 
			/>)
		}
	</section>
	);
};