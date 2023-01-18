import {configureStore} from "@reduxjs/toolkit";

import isLoggedReducer from "./reducers/isLoggedReducer.js"
import usernameReducer from "./reducers/usernameReducer.js"
import passwordReducer from "./reducers/passwordReducer.js"

export default configureStore({
	reducer: {
		isLogged: isLoggedReducer,
		username: usernameReducer,
		password: passwordReducer
	},
});