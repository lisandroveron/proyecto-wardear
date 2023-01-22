import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import "./UserMenu.css";

export default function UserMenu(){
	const [isSigningUp, setIsSigningUp] = useState(false);

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
					payload: body.success
				});
			});
	};
	function signup(event){
		event.preventDefault();
		fetch("/signup", {
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
				type: "username/set",
				payload: body.username
			});
			dispatch({
				type: "password/set",
				payload: body.password
			});
			dispatch({
				type: "isLogged/set",
				payload: body.success
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
	?<>
		<p>Hola, {username}</p>
		<p><span onClick={() => dispatch({
			type: "isLogged/set",
			payload: false
		})}>Cerrar sesión</span></p>
	</>
	: isSigningUp
		?<>
			<form onSubmit={signup}>
				<input type="text" name="username" placeholder="Usuario" onChange={(event) => {
					dispatch({
						type: "username/set",
						payload: event.target.value
					});
				}} value={username} />
				<input type="password" name="password" placeholder="Contraseña" onChange={(event) => {
					dispatch({
						type: "password/set",
						payload: event.target.value
					});
				}} value={password} />
				<input type="submit" value="Crear cuenta" />
			</form>
			<p>Ya tienes cuenta? <span onClick={() => setIsSigningUp(false)}>Iniciar sesión.</span></p>
		</>
		:<>
			<form onSubmit={login}>
				<input type="text" name="username" placeholder="Usuario" onChange={(event) => {
					dispatch({
						type: "username/set",
						payload: event.target.value
					});
				}} value={username} />
				<input type="password" name="password" placeholder="Contraseña" onChange={(event) => {
					dispatch({
						type: "password/set",
						payload: event.target.value
					});
				}} value={password} />
				<input type="submit" value="Iniciar sesión" />
			</form>
			<p>No tienes cuenta? <span onClick={() => setIsSigningUp(true)}>Crear cuenta.</span></p>
		</>
	}
	</div>
	);
};