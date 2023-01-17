import {NavLink} from "react-router-dom";
import GuideCard from "../../components/GuideCard/GuideCard.jsx";
import "./Home.css";

export default function Home(){
	return(<>
		<section>
			<h2>Guías</h2>
			<div className="search">
				<input type="search" />
				<NavLink to="/GuideMaker" className="router">+</NavLink>
			</div>
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