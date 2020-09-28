// @ts-check
import ImageCompressor from "compressorjs";
/**
 * @typedef {import("compressorjs").default.Options&{enable:boolean|{(file:File):boolean},showLog:boolean}} CompressConfig
 */
/**
 * @type {CompressConfig}
 * 更多配置参考：https://www.npmjs.com/package/compressorjs
 */
export const defaultCompressConfig = {
    enable: false, // boolean | function
    showLog: false, //boolean
    maxWidth: 1600,
    quality: 0.6,
    convertSize: 2 << 20, // 超过2M的png，将被转换成jpg
}


/**
 * 
 * @param {*} config 
 * @param {'enable'|'showLog'|'maxWidth'|'quality'|'convertSize'|'mimeType'} key 
 * @param {'boolean'|'number'|'string'} hint
 */
function validateKey(config, key, hint) {
    if (config[key] !== undefined && typeof config[key] !== hint) {
        throw new Error(`ImgSelect's prop 'compress' error: '${key}' field must be a ${hint} value,but got ${typeof config[key]} '${config[key]}'`)
    }
}
/**
 * @returns {CompressConfig}
 * @param {boolean|function|CompressConfig} config 
 */
function initConfig(config) {
    if (null === config || undefined === config) {
        return Object.assign({}, defaultCompressConfig)
    }
    if (typeof config === 'boolean' || typeof config === 'function') {
        return Object.assign({}, defaultCompressConfig, { enable: config })
    }
    if (typeof config !== 'object') {
        throw new Error("ImgSelect's prop 'compress' must be an Object, boolean or function such like (file:File)=>boolean!")
    }
    validateKey(config, 'showLog', 'boolean')
    if (typeof config.enable !== 'function') {
        validateKey(config, 'enable', 'boolean')
    }
    validateKey(config, 'maxWidth', 'number')
    validateKey(config, 'quality', 'number')
    validateKey(config, 'convertSize', 'number')
    validateKey(config, 'mimeType', 'string')
    return Object.assign({}, defaultCompressConfig, config)
}

export const _mixin = {
    props: {
        compress: {
            type: [Boolean, Function, Object],
        },
    },
    data() {

    },
    methods: {
        /**
         * @param {File} file 
         */
        async compressFile(file) {
            let conf = initConfig(this.compress);
            let compressFlag = conf.enable
            let showLog = conf.showLog
            if (typeof compressFlag === 'function') {
                compressFlag = compressFlag(file)
            }
            if (!compressFlag) {
                return file
            }
            conf.enable = conf.showLog = false
            return new Promise((resolve) => {
                new ImageCompressor(file, {
                    ...conf,
                    success: (newFile) => {
                        resolve(newFile);
                        if (showLog) {
                            console.log(
                                file.name +
                                ": %c压缩前 " +
                                (file.size >> 10) +
                                "KB  压缩后 " +
                                (newFile.size >> 10) +
                                "KB  %c压缩率 " +
                                ((file.size - newFile.size) / file.size).toFixed(4), 'color:red', 'color:blue'
                            );
                        }
                    },
                    error(err) {
                        console.error(err.message);
                        resolve(file);
                    },
                });
            })
        }

    }

}