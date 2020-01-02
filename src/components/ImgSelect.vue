<template>
  <div>
    <Modal v-model="modal4delConfirm" title="确定删除" @on-ok="handleRemove(delIndex)">
      <span>确定要删除吗？？？</span>
    </Modal>
    <Modal title="图片预览" v-model="modal4preview">
      <img :src="reviewImgUrl" style="width: 100%" />
    </Modal>
    <div v-for="(item, ind) in imgList" :key="ind" style="display:inline-block">
      <div class="demo-upload-list" v-if="item.url">
        <img :src="item.url" />
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="confirmRemove(ind)"></Icon>
        </div>
      </div>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="/common/content/picture/upload"
      style="display: inline-block;width:58px;"
      accept=".jpg, .jpeg, .png"
      v-show="notFull||!noSelectWhenFull"
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
    matchListFn: {
      default() {
        return () => {
          for (let i = 0; i < this.imgList.length; i++) {
            if (!this.imgList[i].url) {
              return i;
            }
          }
          this.imgList.push({
            url: "",
            key: "",
            file: null
          });
          return this.imgList.length - 1;
        };
      }
    },
    noSelectWhenFull: {
      default: false
    }
  },
  data() {
    return {
      modal4delConfirm: false,
      delIndex: -1,
      reviewImgUrl: "",
      modal4preview: false,
      selectedFiles: [],
      isUploading: false,
      notFull: true
    };
  },
  methods: {
    handleView(picObj) {
      this.reviewImgUrl = picObj.url;
      this.modal4preview = true;
    },
    confirmRemove(ind) {
      this.modal4delConfirm = true;
      this.delIndex = ind;
    },
    handleRemove(index) {
      this.imgList[index].url = "";
      this.imgList[index].key = "";
      this.imgList[index].file = undefined;
      this.notFull = true;
      this.$emit("imgsChange", [index]);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload(file) {
      this.selectedFiles.push(file);
      if (!this.isUploading) {
        this.isUploading = true;
        setTimeout(() => {
          this.initImages(this.selectedFiles);
          this.isUploading = false;
          this.selectedFiles = [];
        }, 100);
      }
      return false;
    },
    /**
     * @param {File} file
     */
    compressAndAddIndex(file, ind, changeInds) {
      return new Promise(resolve => {
        new ImageCompressor(file, {
          quality: 0.4,
          success: newFile => {
            let imgObj = this.imgList[ind];
            const reader = new FileReader();
            reader.readAsDataURL(newFile);
            reader.onload = () => {
              imgObj.url = reader.result;
              imgObj.key = "";
              imgObj.file = newFile;

              changeInds.push(ind);
              this.$forceUpdate();
              resolve();
            };
          },
          error(err) {
            console.error(err.message);
            resolve();
          }
        });
      });
    },
    initImages(files) {
      let reqs = [];
      let changeInds = [];
      files.forEach(file => {
        let ind = this.matchListFn(file, this.imgList);
        if (ind < 0) {
          return;
        }
        // 这里要做判断，是否覆盖！！

        reqs.push(this.compressAndAddIndex(file, ind, changeInds));
      });
      Promise.all(reqs).then(() => {
        if (changeInds.length) {
          this.$emit("imgsChange", changeInds);
          this.notFull = this.imgList.some(imgObj => !imgObj.url);
        }
      });
    }
  },
  watch: {
    imgList() {
      this.notFull = this.imgList.some(imgObj => !imgObj.url);
    }
  }
};
</script>

 <style scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.uploaded {
  width: 60px;
  height: 60px;
}
.uploaded-img {
  width: 100%;
  height: 100%;
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
