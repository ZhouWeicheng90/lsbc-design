import UploadService from './components/qiniuUploadService'

/**
 * 开发环境要像这样导出：
 * export let test = 'test------export'
 * export let UploadService = uploadService
 * 发布环境要向这样导出：
 * export default {
 *     UploadService,
 *     test: 'test------export'
 * }
 * 这两种导出方式，导致的不兼容，该如何解决？？？
 */

// export let test = 'test------export'
// export let UploadService = uploadService
export default {
    UploadService,
    test: 'test------export'

}