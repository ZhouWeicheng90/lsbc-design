import ImgSelect from './components/ImgSelect'
import MobilePreview from './components/MobilePreview'
import A from './components/A'
import B from './components/B'

export default {
    install: vue => {
        // 这里不可使用异步组件：
        vue.component('ImgSelect', ImgSelect);
        vue.component('MobilePreview', MobilePreview)
        vue.component('A', A)
        vue.component('B', B)
    },
}