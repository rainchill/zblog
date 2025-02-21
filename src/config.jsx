import bgImg from '@/assets/images/bg.jpg';
import loadingGif from '@/assets/images/loading.gif';

// const url = 'https://blog.uu3k.eu.org/';
const url = 'http://localhost:3000/';

const config = {
    avatar: url + 'avatar.jpg',
    bgImg: { bgImg },
    loadingGif: { loadingGif },
    authorName: '',
    local: 'http://localhost:8080/',
    apiUrl: url + 'api/',
    uploadDir: url + 'uploads/', // dir
    // article: 'https://blog.uu3k.eu.org/articles/',
    upload: url + 'api/upload',  // action
    login: url + 'api/login',
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