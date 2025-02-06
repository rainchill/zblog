import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import { config } from "@/config";

const homeStore = createSlice({
    name: 'home',
    initialState: {
        // 当前页
        currentPages: 0,
        // 总页数
        totalPages: 0,
        cardList: [],
        articleInfo: {},
        avatar: '',
        author: {}
    },
    reducers: {
        setCurrentPages(state, action) {
            state.currentPages = action.payload
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload
        },
        setCardList(state, action) {
            state.cardList = action.payload
        },
        setArticleInfo(state, action) {
            state.articleInfo = action.payload
        },
        // setAvatar(state, action) {
        //     state.avatar = action.payload
        // },
        setAuthor(state, action) {
            state.author = action.payload
        }

    }
})

const { setTotalPages, setCurrentPages, setCardList, setAvatar, setAuthor, setArticleInfo } = homeStore.actions

const fetchHomeInfo = () => {
    return async (dispatch) => {
        // const res = await axios.get('http://localhost:3000/api/home');
        const res = await axios.get(config.apiUrl + 'home');
        dispatch(setTotalPages(res.data.total));
        dispatch(setCardList(res.data.cardList));
        dispatch(setAuthor(res.data.author));
    }
}

const updatePage = (page) => {
    return async (dispatch) => {
        // console.log('page=', page)
        // const res = await axios.get('http://localhost:3000/api/page/' + page)
        const res = await axios.get(config.apiUrl + 'page' + page)
        dispatch(setCardList(res.data.newCardList))
    }
}

const fetchAuthor = () => {
    return async (dispatch) => {
        // const res = await axios.get('http://localhost:3000/api/author');
        const res = await axios.get(config.apiUrl + 'author');
        dispatch(setAuthor(res.data));
    }
}

const fetchArticleInfo = (id) => {
    return async (dispatch) => {
        // const res = await axios.get('http://localhost:3000/api/articles?id=' + id);
        const res = await axios.get(config.apiUrl + 'articles?id=' + id);
        dispatch(setArticleInfo(res.data));
    }
}


const fetchCategoryArticles = (category) => {
    return async (dispatch) => {
        const res = await axios.get(config.apiUrl + 'articles', {
            params: {
                category: category,
                page: 1,
                pageSize: 8
            }
        });

        const { total, articles } = res.data
        // console.log('total=', total, 'articles=', articles)
        dispatch(setCardList(articles));
        dispatch(setTotalPages(total));
    }
}

const updateCategoryPage = (category, page, pageSize) => {
    return async (dispatch) => {
        const res = await axios.get(config.apiUrl + 'articles', {
            params: {
                category: category,
                page: page,
                pageSize: pageSize
            }
        });

        const { total, articles } = res.data;

        dispatch(setCardList(articles));
    }
}


export { fetchHomeInfo, updatePage, fetchAuthor, fetchArticleInfo, fetchCategoryArticles, updateCategoryPage }

const homeReducer = homeStore.reducer

export default homeReducer