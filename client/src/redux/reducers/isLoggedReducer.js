import {createSlice} from "@reduxjs/toolkit";

export const isLoggedReducer = createSlice({
	name: "isLogged",
	initialState: {
		value: false
	},
	reducers: {
		set: (state, action) => {
			state.value = action.payload
		},
	}
});

export const {set} = isLoggedReducer.actions;

export default isLoggedReducer.reducer;