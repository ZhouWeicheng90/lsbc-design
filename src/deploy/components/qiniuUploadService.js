import * as qiniu from "qiniu-js";
import axios from 'axios'

const _executeUpload = function (file, token, mediaType) {
    const config = {
        useCdnDomain: false,
        region: qiniu.region.z2
    };
    const _getMimeType = function (mediaType) {
        switch (mediaType) {
            case 1: return ["image/jpeg","image/png","image/gif","image/*"]
            case 2: return ["audio/*"]
            default: return [];
        }

    }
    const putExtra = {
        fname: file.name,
        params: {},
        mimeType: _getMimeType(mediaType)
    };
    return new Promise((resolve, reject) => {
        qiniu.upload(file, null, token, putExtra, config).subscribe({
            next(res) {
                // 这里是上传进度的相关信息
            },
            error(err) {
                reject(err);
            },
            complete(uploadRes) {
                resolve(uploadRes);
            }
        }); // 上传开始
    });
}
/**
 * 1 图片，2 音频, 3 音频
 * GET /qiniu/content/token?mediaType=1  获取私有token  X-Access-Token

 * get /qiniu/url?showPub=true 获取公有url
 * 
 * 
 * POST /qiniu/content/illustration 获取图片url，并在后台建立key与资源的关联
 * POST /qiniu/content/media  音频的url，没有和图片统一，因为后台处理较复杂，多了一个加密
 */
export default class {
    constructor(getAccessTokenFn, baseURL = '/upld') {
        this.Θaxios = axios.create({
            baseURL,
            timeout: 30000,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        this.Θaxios.interceptors.request.use(req => {
            req.headers['X-Access-Token'] = getAccessTokenFn()
            return req;
        })
        this.Θaxios.interceptors.response.use((response) => {
            if (response.status === 200) {
                let res = response.data
                if (res.code === 0 || res.code === 200) {
                    return res.data || res.result
                } else {
                    return Promise.reject(res.msg || res.message || '请求错误！')
                }
            } else {
                return Promise.reject(response.message || response)
            }
        }, err => {
            if (err.response) {
                err = err.response
                if (err.data) {
                    err = err.data
                }
            }
            return Promise.reject(err.message || err.msg || err)
        })
    }
    async uploadMutiple(lines, mediaType, handleFn = undefined) {
        // 全部成功才能成功：
        let reqs = [];
        lines.forEach((line, ind) => {
            reqs.push(this.uploadOne(line.file).then(res => {
                line.url = res.url;
                line.key = res.key;
                line.file = undefined;
                if (typeof handleFn === 'function') {
                    return handleFn(res, line, ind, lines)
                }
            }))
        })
        await Promise.all(reqs)
    }
    async uploadPrivateMutiple(lines, mediaType, handleFn = undefined) { }
    /**
     * 上传一个文件，到公共区间
     * @param {*} file 
     * @param {*} mediaType 
     */
    async uploadOne(file, mediaType) {
        let tokenRes = await this.Θaxios({
            url: '/qiniu/token?showPub=true',
            method: 'get'
        });
        let uploadRes = await _executeUpload(file, tokenRes.token, mediaType);

        let param = {
            key: uploadRes.key,
            resouceName: file.name,
            size: file.size,
            showPub: true
        };
        // TODO 此处未必会返回code！！
        let res = await this.Θaxios(param)
        return res && res.data || res
    }

    /**
     * 上传一个文件到私有加密空间
     * @param {*} file 
     * @param {*} mediaType 
     */
    async uploadPrivateOne(file, mediaType) { }

}



