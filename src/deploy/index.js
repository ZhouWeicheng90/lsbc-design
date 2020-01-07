import ImgSelect from './components/ImgSelect'
import MobilePreview from './components/MobilePreview'

export default {
    install: vue => {
        vue.component('ImgSelect', ImgSelect);
        vue.component('MobilePreview', MobilePreview)
    },
}