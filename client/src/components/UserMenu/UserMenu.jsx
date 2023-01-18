import {useSelector, useDispatch} from "react-redux";

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

	return(<>
	{
		isLogged
		?<p>Estas loggeado</p>
		:<form id="login" onSubmit={login}>
			<input type="text" name="user" onChange={(event) => {
				dispatch({
					type: "username/set",
					payload: event.target.value
				});
			}} />
			<input type="password" name="password" onChange={(event) => {
				dispatch({
					type: "password/set",
					payload: event.target.value
				});
			}} />
			<input type="submit" value="Iniciar sesión" />
		</form>
	}
	</>);
};