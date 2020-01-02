import ImgSelect from './components/ImgSelect'
export default {
    install: vue => {
        console.log('after change version lsbc-design !')
        // 注意这里不可使用异步组件：
        vue.component('ImgSelect', ImgSelect)
    },
}