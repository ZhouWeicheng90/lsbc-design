// @ts-check
import * as qiniu from "qiniu-js";

/**
 * @param {File} file 
 */
function _getMediaType(file) {
    if (/^image\/.+$/i.test(file.type)) {
        return 1
    }
    if (/^audio\/.+$/i.test(file.type)) {
        return 2
    }
    if (/^video\/.+$/i.test(file.type)) {
        return 3
    }
    return 4
}

/**
 * @returns {['get'|'post'|'put'|'delete',string]}
 * @param {boolean} isPrivate 
 * @param {'token'|'url'} requestType 
 * @param {1 | 2 | 3 | 4} mediaType 
 */
function _getRequestInfo(isPrivate, requestType, mediaType) {
    if (isPrivate) {
        if (requestType === 'token') {
            return ['get', `/qiniu/content/token?mediaType=${mediaType}`]
        }
        return ['post', mediaType === 1 ? '/qiniu/content/illustration' : `/qiniu/content/media`]
    } else {
        if (requestType === 'token') {
            return ['get', '/qiniu/token?showPub=true']
        }
        return ['get', '/qiniu/url']
    }
}

/**
 * 
 * @param {File} file 
 * @param {string} token 
 * @param {function ({percent: number,loaded: number,size:number}):void} [onProgress]
 */
function _executeUpload(file, token, onProgress = undefined) {
    const config = {
        useCdnDomain: false,
        region: qiniu.region.z2
    };
    const putExtra = {
        fname: file.name,
        params: {},
        mimeType: null // 类型不再限定
    };
    return new Promise((resolve, reject) => {
        qiniu.upload(file, null, token, putExtra, config).subscribe({
            next(res) {
                if (typeof onProgress === 'function') {
                    onProgress(res.total)
                }
            },
            error(err) {
                reject(err);
            },
            complete(uploadRes) {
                resolve(uploadRes);
            }
        });
    });
}
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
     
     * @param { import("axios").AxiosInstance } axiosInstance 
     */
    constructor(axiosInstance) {
        if (!axiosInstance || !axiosInstance.interceptors || !axiosInstance.get || !axiosInstance.post || typeof axiosInstance !== 'function') {
            throw new Error('You must provide a correct axiosInstance when using upload service !')
        }
        this.Θaxios = axiosInstance
    }

    /**
     * 如果传入了successCallback回调，返回的将是回调处理结果的数组，否则返回的是上传结果（参考 uploadOne 方法）的数组 
     * @param {File[]} files 
     * @param {boolean} [isPrivate = true] - 私有空间上传？default true
     * @param {(res:{key:string,url:string},ind:number)=>any} [successCallback] 
     * @param {(res:{percent: number,loaded: number,size: number},ind:number)=>void} [onProgressCallback]
     */
    async uploadMutiple(files, isPrivate = true, successCallback = undefined, onProgressCallback) {
        // 全部成功才能成功：
        const reqs = [];
        files.forEach((file, ind) => {
            reqs.push(this.uploadOne(file, isPrivate, res => {
                if (typeof onProgressCallback === 'function') {
                    onProgressCallback(res, ind)
                }
            }).then(res => {
                if (typeof successCallback === 'function') {
                    return successCallback(res, ind)
                }
                return res
            }))
        })
        return await Promise.all(reqs)
    }

    /**
     * @param {File} file 
     * @param {boolean} [isPrivate = true] - 私有空间上传？default true
     * @param {function ({percent: number,loaded: number,size: number}) : void} [onProgressCallback]
     */
    async uploadOne(file, isPrivate = true, onProgressCallback) {
        const mediaType = _getMediaType(file)
        const tokenReq = _getRequestInfo(isPrivate, 'token', mediaType)
        const urlReq = _getRequestInfo(isPrivate, 'url', mediaType)

        /**
         * @template T
         * @typedef {{code:number,data:T,msg:string}} AxiosRes
         */
        /**
         *  请求上传token
         * @typedef  {{mediaId:string, mediaKey:string, token:string }} TokenRes        
         * @type {TokenRes|AxiosRes<TokenRes>}        
         */
        // @ts-ignore
        const tokenResBuf = await this.Θaxios({
            url: tokenReq[1],
            method: tokenReq[0]
        });

        const tokenRes = typeof /**@type{ AxiosRes<TokenRes>}*/(tokenResBuf).data === 'undefined' ?  /**@type{ TokenRes}*/(tokenResBuf) : /**@type{ AxiosRes<TokenRes>}*/(tokenResBuf).data

        // 开始上传
        const uploadRes = await _executeUpload(file, tokenRes.token, onProgressCallback);

        // 获取结果url
        const params = Object.assign({
            key: uploadRes.key,
            resouceName: file.name,
            size: file.size
        }, isPrivate ? {
            mediaType,
            mediaId: tokenRes.mediaId,
            mediaKey: tokenRes.mediaKey
        } : { showPub: true })
        /**
         * @typedef {{url:string,key:string}} UrlRes
         * @type {UrlRes|AxiosRes<UrlRes>}
         */
        // @ts-ignore
        const urlResBuf = await this.Θaxios(Object.assign({
            method: urlReq[0],
            url: urlReq[1]
        }, urlReq[0] === 'get' ? { params } :
            { data: params }))
        const urlRes = typeof /** @type {AxiosRes<UrlRes>}*/(urlResBuf).data === 'undefined' ?/** @type {UrlRes}*/(urlResBuf) :/** @type {AxiosRes<UrlRes>}*/(urlResBuf).data

        return { key: urlRes.key, url: urlRes.url }
    }
}
