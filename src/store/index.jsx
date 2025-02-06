import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./modules/homeStore";
import commonPageReducer from "./modules/commonPageStore";

const store = configureStore({
    reducer: {
        home: homeReducer,
        commonPage: commonPageReducer,
    }
})

export default store