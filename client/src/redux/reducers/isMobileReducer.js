import {createSlice} from "@reduxjs/toolkit";

export const isMobileReducer = createSlice({
	name: "isMobile",
	initialState: {
		value: true
	},
	reducers: {
		set: (state, action) => {
			state.value = action.payload;
		},
	}
});

export const {set} = isMobileReducer.actions;

export default isMobileReducer.reducer;