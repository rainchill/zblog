import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const commentsStore = createSlice({
    name: 'comments',
    initialState: {
        id: '',
        email: '',
        website: '',
        desc: '',
        commentList: []
    },
    reducers: {
        setId(state, action) {
            state.id = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setWebsite(state, action) {
            state.website = action.payload;
        },
        setDesc(state, action) {
            state.desc = action.payload;
        },
        setCommentList(state, action) {
            state.commentList = action.payload;
        }
    }
})

const { setId, setEmail, setWebsite, setDesc, setCommentList } = commentsStore.actions


const setCommentX = (e, model) => {
    switch (model) {
        case 'id':
            return async (dispatch) => {
                dispatch(setId(e.target.value));
            }
        case 'email':
            return async (dispatch) => {
                dispatch(setEmail(e.target.value));
            }
        case 'website':
            return async (dispatch) => {
                dispatch(setWebsite(e.target.value));
            }
        case 'desc':
            return async (dispatch) => {
                dispatch(setDesc(e.target.value));
            }
    }
}

const setXCommentList = (list) => {
    return async (dispatch) => {
        dispatch(setCommentList(list));
    }
}


export { setCommentX, setXCommentList }

const commentsReducer = commentsStore.reducer

export default commentsReducer