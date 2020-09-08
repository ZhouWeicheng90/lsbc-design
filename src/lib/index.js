
import ImgSelect from './components/img-select/ImgSelect'
import MobilePreview from './components/MobilePreview'
export default {
    install: vue => {
        // 这里不可使用异步组件：
        vue.component('ImgSelect', ImgSelect);
        vue.component('MobilePreview', MobilePreview)        
    },
}