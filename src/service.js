import UploadService from './components/qiniuUploadService'

/**
 * 不能像下面这样导出，否则打包dist后，无法识别：
 * export let test = 'test------export'
 * export let UploadService = uploadService
 */
export default {
    UploadService,
    test: 'test------export'
}