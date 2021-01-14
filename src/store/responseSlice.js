import {createSlice} from '@reduxjs/toolkit'

export const responseSlice = createSlice({
    name: 'response',
	initialState: [],
	reducers: {
		userAnswer: (state, action) => {
			console.log(action.payload);
			const {surveyId, answers} = action.payload;
			state.push({
				surveyId,
				answers
			})
		}
	}
});