import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCommonPageTitle } from "@/store/modules/commonPageStore";
import { useParams } from "react-router-dom";
import axios from "axios";
import { config } from "@/config";
import { fetchCategoryArticles, updateCategoryPage } from "@/store/modules/homeStore";

import ArticleCardList from "@/pages/Home/components/ArticleCardList";

const CategoryDetail = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { category } = useParams();

    // useEffect(() => {
    //     dispatch(setCommonPageTitle(title));
    //     console.log('title=', title);

    // }, [location])
    useEffect(() => {
        // console.log('xxxxxxxxxx123, category=', category)
        dispatch(fetchCategoryArticles(category));
    }, [category])

    return (
        <>
            <ArticleCardList onChange={(page) => {
                console.log('aaaaaaaaaa, c=', category, 'page=', page)
                dispatch(updateCategoryPage(category, page, 8));
            }} />
        </>
    )
}

export default CategoryDetail;