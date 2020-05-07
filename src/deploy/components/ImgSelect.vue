<template>
  <div style="display:inline-block;">
    <Modal title="图片预览" v-model="modal4preview" :width="600">
      <img :src="reviewImgUrl" style="max-width: 100%" />
    </Modal>

    <div
      v-for="(item, ind) in (imgList||[])"
      v-show="item.url"
      :key="ind"
      class="demo-img"
      :class="equalProportion?'equal-ratio':'full-parent'"
      :style="{backgroundImage:item.url==loading_img_flag?'':`url(${item.url})`}"
    >
      <div class="demo-img-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
        <Poptip title="确定删除吗？" confirm transfer @on-ok="handleRemove(ind)">
          <Icon type="ios-trash-outline"></Icon>
        </Poptip>
      </div>
    </div>

    <Upload
      :before-upload="handleBeforeUpload"
      multiple
      action="x"
      type="drag"
      style="display: inline-block;width:58px;"
      accept="image/*"
      v-show="notFull||!hiddeSelectWhenFull"
    >
      <Icon style="height:58px;line-height: 58px;" type="ios-camera" size="20"></Icon>
    </Upload>
  </div>
</template>
<script>
import ImageCompressor from "image-compressor.js";
const loadingIco = "Loading%%=";
function getImgUrlFromFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}
export default {
  props: {
    imgList: {
      type: Array
    },
    findMatchIndex: {
      default() {
        return (a, b, c, d, e, f, g, h, i, j, k) => {
          for (let i = 0; i < this.imgList.length; i++) {
            if (!this.imgList[i].url) {
              return i;
            }
          }
          if (this.imgList.length < this.maxlen) {
            this.imgList.push({
              url: "",
              file: null
            });
            return this.imgList.length - 1;
          }
          return -1;
        };
      }
    },
    maxLength: {
      default: 0,
      type: Number
    },
    hasPlace: {
      default: true,
      type: Boolean
    },

    hiddeSelectWhenFull: {
      default: false,
      type: Boolean
    },
    equalProportion: {
      default: false,
      type: Boolean
    },

    compressAble: {
      default: true,
      type: Boolean | Function
    },
    showCompressLog: {
      default: false,
      type: Boolean
    },
    compressMaxWidth: {
      type: Number,
      default: 1600
    },
    compressQuality: {
      type: Number,
      default: 0.6
    }
  },
  data() {
    return {
      reviewImgUrl: "",
      modal4preview: false,

      selectedFiles: [],
      isUploading: false,
      loading_img_flag: loadingIco
    };
  },
  computed: {
    notFull() {
      if (!this.imgList) {
        return true;
      }
      if (this.imgList.length < this.maxlen) {
        return true;
      }
      return (this.imgList || []).some(imgObj => !imgObj.url);
    },
    maxlen() {
      if (this.findMatchIndex.length === 11) {
        //  默认函数，设置的maxLength和hasPlace才有效，否则hasPlace为true，maxLength由用户的函数控制。
        let max = Math.floor(this.maxLength) || 0;
        if (max <= 0) {
          // 无效的时候
          max = this.hasPlace ? -1 : Number.MAX_SAFE_INTEGER;
        }
        return max;
      }
      return (this.imgList || []).length;
    }
  },
  methods: {
    handleView(picObj) {
      this.reviewImgUrl = picObj.url;
      this.modal4preview = true;
    },
    handleRemove(index) {
      if (this.findMatchIndex.length !== 11 || this.hasPlace) {
        // findMatchIndex.length 不为11 说明用户传入了匹配函数，必须是有位置的，即使设了`hasPlace = false`也无效
        this.imgList[index].url = "";
        this.imgList[index].file = undefined;
        this.$emit("imgsChange", [index]);
        this.$forceUpdate();
      } else {
        this.imgList.splice(index, 1);
        const inds = [];
        for (let i = index; i <= this.imgList.length; i++) {
          inds.push(i);
        }
        this.$emit("imgsChange", inds);
      }
    },

    handleBeforeUpload(file) {
      if (/image/.test(file.type)) {
        let ind = this.findMatchIndex(file, this.imgList);
        if (ind >= 0) {
          this.imgList[ind].url = loadingIco;
          this.imgList[ind].file = file;

          this.$forceUpdate();
          if (!this.isUploading) {
            this.isUploading = true;
            setTimeout(() => {
              this._initImages();
              this.isUploading = false;
            }, 200);
          }
        }
      }
      return false;
    },

    _initImages() {
      let reqs = [];
      let changeInds = [];
      this.imgList.forEach((imgObj, ind) => {
        if (imgObj.url !== loadingIco) {
          return;
        }
        let compressFlag = this.compressAble;
        if (typeof this.compressAble === "function") {
          compressFlag = this.compressAble(imgObj.file);
        }
        // this.compressAble && imgObj.file.size > 300 * 1024
        if (compressFlag) {
          reqs.push(
            this._compress(imgObj.file).then(newFile => {
              imgObj.file = newFile;
              return getImgUrlFromFile(newFile).then(url => {
                imgObj.url = url;
                changeInds.push(ind);
              });
            })
          );
        } else {
          reqs.push(
            getImgUrlFromFile(imgObj.file).then(url => {
              imgObj.url = url;
              changeInds.push(ind);
            })
          );
        }
      });
      Promise.all(reqs).then(() => {
        if (changeInds.length) {
          this.$forceUpdate();
          this.$emit("imgsChange", changeInds);
        }
      });
    },

    /**
     * @param {File} file
     */
    _compress(file) {
      const _this = this;
      return new Promise(resolve => {
        new ImageCompressor(file, {
          quality: this.compressQuality,
          maxWidth: this.compressMaxWidth,
          success: newFile => {
            resolve(newFile);
            if (this.showCompressLog) {
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
          }
        });
      });
    }
  },
  beforeMount() {},
  watch: {
    imgList() {}
  }
};
</script>

 <style scoped lang='less'>
.demo-img {
  width: 60px;
  height: 60px;
  display: inline-block;
  border-radius: 8%;
  box-shadow: 0 0 0 1px rgba(#bbb, 0.4) inset;
  overflow: hidden;
  margin-right: 5px;
  position: relative;
}
.demo-img-cover {
  display: flex;
  align-items: center;
  justify-content: space-around;

  visibility: hidden;
  height: 100%;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.6);
  i {
    color: #d1d1d1;
    cursor: pointer;
  }
  i:hover {
    color: #fff;
  }
}
.demo-img:hover .demo-img-cover {
  visibility: visible;
}
.full-parent {
  background-size: 100% 100%;
}
.equal-ratio {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
