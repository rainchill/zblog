import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./modules/homeStore";
import commonPageReducer from "./modules/commonPageStore";
import commentsReducer from "./modules/commentsStore";

const store = configureStore({
    reducer: {
        home: homeReducer,
        commonPage: commonPageReducer,
        comments: commentsReducer
    }
})

export default store