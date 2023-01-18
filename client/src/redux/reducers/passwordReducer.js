import {createSlice} from "@reduxjs/toolkit";

export const passwordReducer = createSlice({
	name: "password",
	initialState: {
		value: ""
	},
	reducers: {
		set: (state, action) => {
			state.value = action.payload;
		},
	}
});

export const {set} = passwordReducer.actions;

export default passwordReducer.reducer;