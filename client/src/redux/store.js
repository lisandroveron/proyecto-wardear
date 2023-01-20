import {configureStore} from "@reduxjs/toolkit";

import isLoggedReducer from "./reducers/isLoggedReducer.js"
import isMenuShowedReducer from "./reducers/isMenuShowedReducer.js"
import isMobileReducer from "./reducers/isMobileReducer.js"
import usernameReducer from "./reducers/usernameReducer.js"
import passwordReducer from "./reducers/passwordReducer.js"

export default configureStore({
	reducer: {
		isLogged: isLoggedReducer,
		isMenuShowed: isMenuShowedReducer,
		isMobile: isMobileReducer,
		password: passwordReducer,
		username: usernameReducer,
	},
});