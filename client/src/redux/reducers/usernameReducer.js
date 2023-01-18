import {createSlice} from "@reduxjs/toolkit";

export const usernameReducer = createSlice({
	name: "username",
	initialState: {
		value: ""
	},
	reducers: {
		set: (state, action) => {
			state.value = action.payload;
		},
	}
});

export const {set} = usernameReducer.actions;

export default usernameReducer.reducer;