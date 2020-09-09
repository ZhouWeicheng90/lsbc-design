/**
 * @typedef  {import("axios").AxiosInstance} AxiosInstance
 */
/**
 * 七牛云上传服务（构造器）：
 ** 大文件上传分片大小: 4M（4\*1024\*1024B）
 *
 ** 上传路径等已封装，但需要提供满足条件的 axios：
 ** * 追加用户token
 ** * 识别url，代理到后台服务
 ** * 请求应该返回 { code: number, data, msg: string } 或直接 data
 *
 ** 上传流程有3步：取token；上传；返回文件key和url
 */
export class UploadService {
    /**
     * @param { AxiosInstance } axiosInstance
     */
    constructor(axiosInstance: AxiosInstance);
    Θaxios: import("axios").AxiosInstance;
    /**
     * 如果传入了successCallback回调，返回的将是回调处理结果的数组，否则返回的是上传结果（参考 uploadOne 方法）的数组
     * @param {File[]} files
     * @param {boolean} [isPrivate = true] - 私有空间上传？default true
     * @param {(res:{key:string,url:string},ind:number)=>any} [successCallback]
     * @param {(res:{percent: number,loaded: number,size: number},ind:number)=>void} [onProgressCallback]
     */
    uploadMutiple(files: File[], isPrivate?: boolean, successCallback?: (res: {
        key: string;
        url: string;
    }, ind: number) => any, onProgressCallback?: (res: {
        percent: number;
        loaded: number;
        size: number;
    }, ind: number) => void): Promise<any[]>;
    /**
     * @param {File} file
     * @param {boolean} [isPrivate = true] - 私有空间上传？default true
     * @param {function ({percent: number,loaded: number,size: number}) : void} [onProgressCallback]
     */
    uploadOne(file: File, isPrivate?: boolean, onProgressCallback?: (arg0: {
        percent: number;
        loaded: number;
        size: number;
    }) => void): Promise<{
        key: string;
        url: string;
    }>;
}
export type AxiosInstance = import("axios").AxiosInstance;
