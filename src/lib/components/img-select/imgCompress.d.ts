/**
 * @typedef {import("compressorjs").default.Options&{enable:boolean|{(file:File):boolean},showLog:boolean}} CompressConfig
 */
/**
 * @type {CompressConfig}
 * 更多配置参考：https://www.npmjs.com/package/compressorjs
 */
export const defaultCompressConfig: CompressConfig;
export namespace _mixin {
    namespace props {
        namespace compress {
            const type: (ObjectConstructor | FunctionConstructor | BooleanConstructor)[];
        }
    }
    function data(): void;
    function data(): void;
    namespace methods {
        /**
         * @param {File} file
         */
        function compressFile(file: File): Promise<any>;
        /**
         * @param {File} file
         */
        function compressFile(file: File): Promise<any>;
    }
}
export type CompressConfig = ImageCompressor.Options & {
    enable: boolean | ((file: File) => boolean);
    showLog: boolean;
};
import ImageCompressor from "compressorjs";
