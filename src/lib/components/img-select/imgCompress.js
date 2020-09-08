// @ts-check
import ImageCompressor from "image-compressor.js";
/**
 * @typedef {{enable:boolean|{(file:File):boolean},showLog:boolean,maxWidth:number,quality:number}} CompressConfig
 */

/**
 * @type {CompressConfig}
 */
const defaultCompressConfig = {
    enable: false, // boolean | function
    showLog: false, //boolean
    maxWidth: 1600,
    quality: 0.6
}

/**
 * 
 * @param {*} config 
 * @param {'enable'|'showLog'|'maxWidth'|'quality'} key 
 * @param {'boolean'|'number'} hint
 */
function validateKey(config, key, hint) {
    if (config[key] !== undefined && typeof config[key] !== hint) {
        throw new Error(`ImgSelect's prop 'compress' error: '${key}' field must be a ${hint} value`)
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
    return Object.assign({}, defaultCompressConfig, config)
}

export const _mixin = {
    props: {
        compress: {
            type: [Boolean, Function, Object],
        },
    },
    created() {
        this.compressConf = initConfig(this.compress);
    },
    methods: {
        async compressFile(file) {
            let compressFlag = this.compressConf.enable
            if (typeof compressFlag === 'function') {
                compressFlag = compressFlag(file)
            }
            if (!compressFlag) {
                return file
            }
            return new Promise((resolve) => {
                new ImageCompressor(file, {
                    quality: this.compressConf.quality,
                    maxWidth: this.compressConf.maxWidth,
                    success: (newFile) => {
                        resolve(newFile);
                        if (this.compressConf.showLog) {
                            console.log(
                                file.name +
                                ": 压缩前 " +
                                (file.size >> 10) +
                                "KB  压缩后 " +
                                (newFile.size >> 10) +
                                "KB  压缩比率 " +
                                (newFile.size / file.size).toFixed(6)
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