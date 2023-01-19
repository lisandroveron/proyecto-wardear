import {useSelector, useDispatch} from "react-redux";
import "./UserMenu.css";

export default function UserMenu(props){
	const isLogged = useSelector(state => state.isLogged.value);
	const username = useSelector(state => state.username.value);
	const password = useSelector(state => state.password.value);
	const dispatch = useDispatch();

	function login(event){
		event.preventDefault();
		fetch("/login", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username,
				password,
			})
		})
			.then(response => response.json())
			.then(body => {
				dispatch({
					type: "isLogged/set",
					payload: body.verified
				});
			});
	};
	function toggleMenu(event){
		const UserMenu_menu = document.getElementById("UserMenu_menu");
		const UserMenu_icon = document.getElementById("UserMenu_icon");
		const currentWidth = getComputedStyle(UserMenu_menu).width;
		// If you change this, change "--username" CSS var too.
		const maxMenuWidth = "200px";
		console.log(getComputedStyle(UserMenu_icon));

		if(currentWidth === "0px"){
			UserMenu_menu.style.setProperty("animation-name", "show");
			UserMenu_icon.style.setProperty("position", "sticky");
		}else if(currentWidth === maxMenuWidth){
			UserMenu_menu.style.setProperty("animation-name", "hide");
			UserMenu_icon.style.setProperty("position", "absolute");
		};
	};

	return(
	<div id="UserMenu">
		<img id="UserMenu_icon" src="/static/assets/icon/project.svg" alt="" onClick={toggleMenu} />
		<div id="UserMenu_menu">
		{
		isLogged
		?<p>Estas loggeado</p>
		:<form id="login" onSubmit={login}>
			<input type="text" name="user" placeholder="Usuario" onChange={(event) => {
				dispatch({
					type: "username/set",
					payload: event.target.value
				});
			}} />
			<input type="password" name="password" placeholder="Contraseña" onChange={(event) => {
				dispatch({
					type: "password/set",
					payload: event.target.value
				});
			}} />
			<input type="submit" value="Iniciar sesión" />
		</form>
		}
		</div>
	</div>
	);
};