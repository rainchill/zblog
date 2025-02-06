import { useEffect, useState } from "react";
import { Card } from "antd";

import { config } from "@/config";
import axios from "axios";

import './CategoryInfo.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCommonPageTitle } from "@/store/modules/commonPageStore";

const CategoryInfo = () => {
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        async function fetchCategory() {
            const data = await axios.get(config.apiUrl + 'category');
            setCategoryList(data.data);
        }

        fetchCategory();
    }, [])

    return (
        <>
            <Card className='category-card'>
                <ul className="custom-list">
                    {categoryList.map(item => {
                        return (
                            <li key={item._id}>
                                <div className="list-item-content">
                                    <a onClick={() => {
                                        navigate('/category/' + item._id);
                                    }}>{item._id}</a>
                                    <span>({item.count})</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </Card>
        </>
    )
}


export default CategoryInfo;