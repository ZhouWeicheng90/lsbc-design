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
export const defautDataConfig: ImgSelectConfig;
export namespace _mixin {
    namespace props {
        namespace config {
            const type: ObjectConstructor;
        }
    }
    namespace computed {
        function full(): boolean;
        function full(): boolean;
    }
    namespace methods {
        /**
         *
         * @param {File} file
         * @param {object[]} list
         */
        function findMatchIndex(file: File, list: any[]): any;
        /**
         *
         * @param {File} file
         * @param {object[]} list
         */
        function findMatchIndex(file: File, list: any[]): any;
    }
    function created(): void;
    function created(): void;
}
export type KeyDef = string | number;
export type MatchDef = ((file: File, list: object[]) => number) | {
    maxLen: number;
};
export type ImgSelectConfig = {
    key: KeyDef;
    url: KeyDef;
    file: KeyDef;
    matchBy: MatchDef;
    equalProportion: boolean;
    hiddeSelectWhenFull: boolean;
};
