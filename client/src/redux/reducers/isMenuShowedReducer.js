import {createSlice} from "@reduxjs/toolkit";

export const isMenuShowedReducer = createSlice({
	name: "isMenuShowed",
	initialState: {
		value: false
	},
	reducers: {
		toggle: (state) => {
			state.value = !state.value;
		},
	}
});

export const {toggle} = isMenuShowedReducer.actions;

export default isMenuShowedReducer.reducer;