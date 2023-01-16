import {NavLink} from "react-router-dom";
import GuideCard from "../components/GuideCard/GuideCard.jsx";

export default function Home(){
	return(<>
		<h2>Guías</h2>
		<section className="search">
			<input type="search" />
			<NavLink to="/GuideMaker">+</NavLink>
		</section>
		<section>
			<GuideCard />
			<GuideCard />
			<GuideCard />
			<GuideCard />
			<GuideCard />
			<GuideCard />
			<GuideCard />
			<GuideCard />
		</section>
	</>);
};