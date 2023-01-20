import {useSelector, useDispatch} from "react-redux";
import "./UserMenu.css";

export default function UserMenu(){
	const isLogged = useSelector(state => state.isLogged.value);
	const isMenuShowed = useSelector(state => state.isMenuShowed.value);
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

	return(
		<div className="UserMenu" style={
			isMenuShowed
			? {animationName: "menuShowing"}
			: {animationName: "menuHiding"}
		}>
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
	);
};