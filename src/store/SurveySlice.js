import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const createSurvey = createAsyncThunk(
    'surveys/createSurvey',
    async(_,thunkAPI) => {
        const newSurveyId = thunkAPI.getState().surveys.length+1;
        return newSurveyId;
    }
)

export const surveySlice = createSlice({
    name: 'surveys',
    initialState: [],
    reducers:{
        addQuestion: (state,action) => {
            const {surveyId, type, options, question} = action.payload;
            const q = state.find(s => s.surveyId === surveyId)
            const qid = q.length+1;
            q.push({
                qid,type,question,options,
            })
        }
    },
    extraReducers: {
        [createSurvey.fulfilled]: (state,action) => {
            state.push({questions: [], surveyId: action.payload, isPublished: false})
        }
    },

})
