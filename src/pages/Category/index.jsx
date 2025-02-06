import WebHeader from '@/components/WebHeader/WebHeader';
import { Layout, Card } from 'antd';
import { config } from '@/config';

import React, { useEffect, useState } from 'react';
import CommonPage from '@/components/CommonPage/CommonPage';
import SubContent from '@/components/SubContent/SubContent';
import './Category.css';
import axios from 'axios';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonPageTitle } from '@/store/modules/commonPageStore';


const { Header, Footer, Sider, Content } = Layout;

const Category = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { title } = useSelector((state) => state.commonPage)
    const { category } = useParams();

    useEffect(() => {
        if (!category) {
            dispatch(setCommonPageTitle('分类'));
        } else {
            dispatch(setCommonPageTitle(category));
        }
    }, [dispatch, location])


    return (
        <>
            <CommonPage title={title}>
                <SubContent>
                    <Outlet />
                </SubContent>
            </CommonPage>
        </>
    )
};
export default Category;