import ImgSelect from './components/ImgSelect'
import MobilePreview from './components/MobilePreview'
export default {
    install: vue => {       
        // 注意这里不可使用异步组件：
        vue.component('ImgSelect', ImgSelect);
        vue.component('MobilePreview', MobilePreview)
    },
}