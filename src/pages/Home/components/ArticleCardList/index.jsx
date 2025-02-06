import ArticleCard from "../ArticleCard"
import './ArticleCardList.css'
import { useSelector } from "react-redux"
import { fetchHomeInfo } from "@/store/modules/homeStore"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updatePage } from "@/store/modules/homeStore";
import { Pagination } from "antd"


const ArticleCardList = ({ onChange }) => {
    const { cardList, totalPages } = useSelector((state) => state.home);
    const dispatch = useDispatch();

    return (
        <>
            {
                cardList.map((item, index) => {
                    return (
                        <div className="ArticleCardList-card" key={item._id}>
                            <ArticleCard
                                info={item}
                                reverse={index % 2 ? true : false} />
                        </div>
                    )
                })
            }
            <Pagination
                align="center"
                showSizeChanger={false}
                showTitle={false}
                defaultCurrent={1}
                total={totalPages}
                pageSize={8}
                // showLessItems
                onChange={onChange}
            />
        </>
    )
}

export default ArticleCardList