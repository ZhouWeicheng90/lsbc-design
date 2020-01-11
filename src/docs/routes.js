// import TestImgSelect from "./views/TestImgSelect";
// import TestMobilePreview from "./views/TestMobilePreview";
// import TestUploadService from "./views/TestUploadService";
// import Introduction from './views/Introduction'

const pagesContext = require.context('./views', false, /\.vue$/)
let routes = []
pagesContext.keys().forEach(key => {
    let page = pagesContext(key)
    page = page.default || page
    console.log(page.name, page)
    routes.push({
        path: '/' + page.name,
        name: page.name,
        component: page,
        label: page.label
    })

})
console.log(routes)

export default routes