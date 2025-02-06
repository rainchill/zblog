import Home from '../pages/Home'
import Login from '@/pages/Admin/components/AdminLogin'
import AdminArticle from '@/pages/Admin/components/AdminArticle'
import AdminHome from '@/pages/Admin/components/AdminHome'
import Admin from '@/pages/Admin'
import Article from '@/pages/Article'
import ArticleCardList from '@/pages/Home/components/ArticleCardList'
import Category from '@/pages/Category'
import PrivateRoute from './PrivateRoute'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import CategoryInfo from '@/pages/Category/CategoryInfo'
import CategoryDetail from '@/pages/Category/CategoryDetail'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/admin',
        element: (
            <PrivateRoute>
                <Admin />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <AdminHome />
            },
            {
                path: 'article',
                element: <AdminArticle />
            }
        ]
    },
    {
        path: '/post/:id',
        element: <Article />
    },
    {
        path: '/category',
        element: <Category />,
        children: [
            {
                index: true,
                element: <CategoryInfo />
            },
            {
                path: ':category',
                element: <CategoryDetail />
            }
        ]
    }
])

export default router