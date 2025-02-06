import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const commonPageStore = createSlice({
    name: 'commonPage',
    initialState: {
        title: ''
    },
    reducers: {
        setTitle(state, action) {
            state.title = action.payload;
        }
    }
})

const { setTitle } = commonPageStore.actions

const setCommonPageTitle = (title) => {
    return async (dispatch) => {
        dispatch(setTitle(title));
    }
}

export { setCommonPageTitle }

const commonPageReducer = commonPageStore.reducer

export default commonPageReducer