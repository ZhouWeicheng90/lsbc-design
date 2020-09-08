// @ts-check
/**
 * @typedef {string | number } KeyDef
 */
/**
 * @typedef {{(file:File,list:object[]):number}|{maxLen:number}} MatchDef
 */
/**
 * @typedef {{key:KeyDef,url:KeyDef,file:KeyDef,matchBy:MatchDef,equalProportion:boolean,hiddeSelectWhenFull:boolean}} ImgSelectConfig
 */
/**
 * @type {ImgSelectConfig}
 */
const defautDataConfig = {
    key: "key",
    url: "url",
    file: "__file",

    matchBy: function (file, list) {
        // function | Object {maxLen:8}  实在没有理由提供一个hasPlace，以满足无意义的场景：可以扩展到maxLen，却保留位置 —— 这种情况下，传入前 提前追加好就行了！
        for (let i = 0; i < list.length; i++) {
            if (!list[i][this.url]) {
                return i;
            }
        }
        return -1;
    },
    equalProportion: false,
    hiddeSelectWhenFull: false,
};

/**
 * @param {ImgSelectConfig} config 
 * @param {'key'|'file'|'url'} key 
 */
function validateKey(config, key) {
    if (config[key] !== undefined && typeof config[key] !== 'string' && typeof config[key] !== 'number') {
        throw new Error(`ImgSelect's prop 'config' error: '${key}' field must be a string or number`)
    }
}
/**
 * 
 * @param {ImgSelectConfig} config 
 * @param {'equalProportion'|'hiddeSelectWhenFull'} key 
 */
function validateBoolean(config, key) {
    if (config[key] !== undefined && typeof config[key] !== 'boolean') {
        throw new Error(`ImgSelect's prop 'config' error: '${key}' field must be a boolean value`)
    }
}

/**
 * @returns {ImgSelectConfig}
 * @param {ImgSelectConfig} config 
 */
function initConfig(config) {
    if (null === config || undefined === config) {
        return Object.assign({}, defautDataConfig)
    }
    if (typeof config !== 'object') {
        throw new Error("ImgSelect's prop 'config' must be an Object!")
    }
    validateKey(config, 'key')
    validateKey(config, 'url')
    validateKey(config, 'file')
    validateBoolean(config, 'equalProportion')
    validateBoolean(config, 'hiddeSelectWhenFull')
    if (config.matchBy !== undefined && typeof config.matchBy !== 'function') {
        if (config.matchBy === null || typeof config.matchBy !== 'object' || typeof config.matchBy.maxLen !== 'number') {
            throw new Error(`ImgSelect's prop 'config' error: 'matchBy' field must be a function or an object such like {maxLen: number}`)
        }
    }

    const obj = Object.assign({}, defautDataConfig, config)
    return {
        key: obj.key,
        url: obj.url,
        file: obj.file,
        matchBy: obj.matchBy,
        equalProportion: obj.equalProportion,
        hiddeSelectWhenFull: obj.hiddeSelectWhenFull
    }
}

export const _mixin = {
    props: {
        config: {
            type: Object,
        },
    },
    computed: {
        full() {
            let existNull = this.imgHolders.some(
                (imgObj) => !imgObj[this.conf.url]
            );
            if (existNull) {
                return false;
            }
            if (typeof this.conf.matchBy === "object") {
                return this.imgHolders.length >= this.conf.matchBy.maxLen;
            }
            return true
        },
    },
    methods: {
        /**
         * 
         * @param {File} file 
         * @param {object[]} list 
         */
        findMatchIndex(file, list) {
            // use func:
            if (typeof this.conf.matchBy === 'function') {
                return this.conf.matchBy(file, list)
            }
            // use maxLen
            let ind = /**@type {function} */(defautDataConfig.matchBy).call(this.conf, file, list)
            if (ind >= 0) {
                return ind
            }
            if (list.length < this.conf.matchBy.maxLen) {
                list.push({ [this.conf.url]: '' })
                return list.length - 1
            }
            return -1
        },
    },
    created() {
        this.conf = initConfig(this.config);
    },
}