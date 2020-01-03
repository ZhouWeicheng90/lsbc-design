<template>
  <div v-show="hasPlace||!hiddeSelectWhenFull">
    <Modal title="图片预览" v-model="modal4preview">
      <img :src="reviewImgUrl" style="width: 100%" />
    </Modal>
    <div v-for="(item, ind) in imgList" :key="ind" style="display:inline-block">
      <div
        class="demo-img"
        v-if="item.url"
        :class="equalProportion?'equal-ratio':'full-parent'"
        :style="{backgroundImage:`url(${item.url})`}"
      >
        <div class="demo-img-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Poptip title="确定删除吗？" confirm transfer @on-ok="handleRemove(ind)">
            <Icon type="ios-trash-outline"></Icon>
          </Poptip>
        </div>
      </div>
    </div>

    <Upload
      ref="upload"
      :show-upload-list="false"
      :format="['jpg','jpeg','png']"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="/common/content/picture/upload"
      style="display: inline-block;width:58px;"
      accept=".jpg, .jpeg, .png"
      v-show="notFull||!hiddeSelectWhenFull"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
  </div>
</template>
<script>
import ImageCompressor from "image-compressor.js";
export default {
  props: {
    imgList: {
      type: Array
    },
    matchFn: {
      default() {
        return (a, b, c, d, e, f, g, h, i, j, k) => {
          for (let i = 0; i < this.imgList.length; i++) {
            if (!this.imgList[i].url) {
              return i;
            }
          }
          if (!this.hasPlace) {
            this.imgList.push({
              url: "",
              key: "",
              file: null
            });
            return this.imgList.length - 1;
          }
          return -1;
        };
      }
    },
    hiddeSelectWhenFull: {
      default: false,
      type: Boolean
    },
    hasPlace: {
      default: true,
      type: Boolean
    },
    showCompressLog: {
      default: false,
      type: Boolean
    },
    equalProportion: {
      default: false,
      type: Boolean
    }
  },
  data() {
    const loading = "Loading";
    return {
      reviewImgUrl: "",
      modal4preview: false,
      notFull: true,

      selectedFiles: [],
      isUploading: false,
      loading_img_flag: loading
    };
  },
  methods: {
    handleView(picObj) {
      this.reviewImgUrl = picObj.url;
      this.modal4preview = true;
    },
    handleRemove(index) {
      if (this.matchFn.length !== 11 || this.hasPlace) {
        // matchFn.length 不为11 说明用户传入了匹配函数，必须是有位置的，即使设了`hasPlace = false`也无效
        this.imgList[index].url = "";
        this.imgList[index].key = "";
        this.imgList[index].file = undefined;
        this.notFull = true;
        this.$emit("imgsChange", [index]);
        this.$forceUpdate();
      } else {
        this.imgList.splice(index, 1);
      }
    },

    handleBeforeUpload(file) {
      if (/image/.test(file.type)) {
        let ind = this.matchFn(file, this.imgList);
        if (ind >= 0) {
          this.imgList[ind].url = this.loading_img_flag;
          this.imgList[ind].file = file;
          this.imgList[ind].key = "";
          this.$forceUpdate();
          if (!this.isUploading) {
            this.isUploading = true;
            setTimeout(() => {
              this.initImages();
              this.isUploading = false;
            }, 200);
          }
        }
      }
      return false;
    },

    initImages() {
      let reqs = [];
      let changeInds = [];
      this.imgList.forEach((imgObj, ind) => {
        if (imgObj.url !== this.loading_img_flag) {
          return;
        }
        reqs.push(this.compressAndAddIndex(imgObj.file, ind, changeInds));
      });
      Promise.all(reqs).then(() => {
        if (changeInds.length) {
          this.$emit("imgsChange", changeInds);
          this.notFull = this.imgList.some(imgObj => !imgObj.url);
        }
      });
    },

    /**
     * @param {File} file
     */
    compressAndAddIndex(file, ind, changeInds) {
      const _this = this;
      return new Promise(resolve => {
        new ImageCompressor(file, {
          quality: 0.4,
          maxWidth: 1200,
          success: newFile => {
            let imgObj = _this.imgList[ind];
            const reader = new FileReader();
            reader.readAsDataURL(newFile);
            reader.onload = () => {
              imgObj.url = reader.result;
              imgObj.key = "";
              imgObj.file = newFile;

              changeInds.push(ind);
              _this.$forceUpdate();
              resolve();
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
            };
          },
          error(err) {
            console.error(err.message);
            resolve();
          }
        });
      });
    }
  },
  beforeMount() {
    if (!this.hasPlace && this.hiddeSelectWhenFull) {
      throw new Error(
        `you must not set prop 'hasPlace = false' when using 'hiddeSelectWhenFull = true'!`
      );
    }
  },
  watch: {
    imgList() {
      this.notFull = this.imgList.some(imgObj => !imgObj.url);
    }
  }
};
</script>

 <style scoped lang='scss'>
.demo-img {
  width: 60px;
  height: 60px;
  border-radius: 10%;
  box-shadow: 0 0 0 1px rgba($color: #bbb, $alpha: 0.4) inset;
  overflow: hidden;
  margin-right: 5px;
  position: relative;
}
.demo-img-cover {
  display: flex;
  align-items: center;
  justify-content: space-around;

  visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.5);
  i {
    color: #ddd;
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
