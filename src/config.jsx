import bgImg from '@/assets/images/bg.jpg';
import loadingGif from '@/assets/images/loading.gif';

const config = {
    avatar: 'https://blog.uu3k.eu.org/avatar.jpg',
    bgImg: { bgImg },
    loadingGif: { loadingGif },
    authorName: '',
    local: 'http://localhost:8080/',
    apiUrl: 'https://blog.uu3k.eu.org/api/',
    uploadDir: 'https://blog.uu3k.eu.org/uploads/', // dir
    // article: 'https://blog.uu3k.eu.org/articles/',
    upload: 'https://blog.uu3k.eu.org/api/upload',  // action
    login: 'https://blog.uu3k.eu.org/api/login',
    categoryBgImg: 'https://w.wallhaven.cc/full/zy/wallhaven-zyl5lj.jpg',
    articleShowPageSize: 8
}


// const config = {
//     avatar: 'http://localhost:3000/avatar.jpg',
//     bgImg: { bgImg },
//     loadingGif: { loadingGif },
//     authorName: '',
//     local: 'http://localhost:8080/',
//     apiUrl: 'http://localhost:3000/api/',
//     uploadDir: 'http://localhost:3000/uploads/', // dir
//     // article: 'https://blog.uu3k.eu.org/articles/',
//     upload: 'http://localhost:3000/api/upload',  // action
//     login: 'http://localhost:3000/api/login',
//     categoryBgImg: 'https://w.wallhaven.cc/full/zy/wallhaven-zyl5lj.jpg',
//     articleShowPageSize: 8
// }

export { config };