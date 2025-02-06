import './AdminHome.css'


const AdminHome = () => {
    const task = ['admin后台的自定义主题：如背景图片、颜色、昵称等', '分类页面']
    return (
        <>
            <div className='admin-home'>
                <div>admin home page</div>
                <div >
                    待办：
                    <ol>
                        {task.map(item => <li key={item}>{item}</li>)}
                    </ol>
                </div>
            </div>
        </>
    )
}

export default AdminHome;