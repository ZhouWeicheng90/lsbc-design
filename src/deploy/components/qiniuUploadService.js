import * as qiniu from "qiniu-js";
const config = {
    useCdnDomain: false,
    region: qiniu.region.z2
};


export default class {
    /**
     * 
     * @param {*} getTokenFn 
     * @param {*} getUrlFn 
     * @param {*} mediaType 1：图片，2：音频
     */
    constructor(getTokenFn, getUrlFn, mediaType, isPub = false) {
        this.getTokenFn = getTokenFn
        this.getUrlFn = getUrlFn
        this.mediaType = mediaType
        this.isPub = isPub
    }

    /**
     * 上传多个文件（全部成功才能成功）
     * @param {Array<{file:File}>} lines 文件信息数组
     * @param {(res,line,index,lines)=>Promise} handleFn  单个文件上传成功后的回调
     * @returns {Promise} 
     */
    async uploadMutiple(lines, handleFn = undefined) {
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

    /**
     * 上传单个文件
     * @param {File} file 
     * @returns {Promise<{key,url}>}
     */
    async uploadOne(file) {

        // TODO 此处未必会返回code！！
        let tokenRes = await this.getTokenFn({ showPub: this.isPub, mediaType: this.mediaType });
        if (tokenRes.code !== 0) {
            throw tokenRes.msg || '获取上传token失败！';
        }
        let token = tokenRes.data.token;

        let uploadRes = await this._executeUpload(file, token);

        let param = {
            key: uploadRes.key,
            resouceName: file.name,
            size: file.size,
            mediaType: this.mediaType,
            mediaId: tokenRes.data.mediaId,
            mediaKey: tokenRes.data.mediaKey,
            showPub: this.isPub
        };
        // TODO 此处未必会返回code！！
        let res = await this.getUrlFn(param)
        return res && res.data || res
    }
    _executeUpload(file, token) {

        /*
         * fname: string，文件原文件名.
         * params: object，用来放置自定义变量;
         * mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；   
         */
        const putExtra = {
            fname: file.name,
            params: {},
            mimeType: this.getMimeType(this.mediaType)
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



    getMimeType() {
        switch (this.mediaType) {
            case 1: return ["image/*"]
            case 2: return ["audio/*"]
            default: return [];
        }

    }
}



