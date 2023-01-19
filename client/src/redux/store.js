import {configureStore} from "@reduxjs/toolkit";

import isMobileReducer from "./reducers/isMobileReducer.js"
import isLoggedReducer from "./reducers/isLoggedReducer.js"
import usernameReducer from "./reducers/usernameReducer.js"
import passwordReducer from "./reducers/passwordReducer.js"

export default configureStore({
	reducer: {
		isMobile: isMobileReducer,
		isLogged: isLoggedReducer,
		username: usernameReducer,
		password: passwordReducer
	},
});