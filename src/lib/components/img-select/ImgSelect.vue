<template>
  <div style="display: inline-block">
    <Modal title="图片预览" v-model="modal4preview" :width="600">
      <img :src="reviewImgUrl" style="max-width: 100%" />
    </Modal>

    <div
      v-for="(item, ind) in imgHolders"
      v-show="item[conf.url]"
      :key="ind"
      class="demo-img"
      :class="conf.equalProportion ? 'equal-ratio' : 'full-parent'"
      :style="{
        backgroundImage: item[conf.url] ? `url(${item[conf.url]})` : '',
      }"
    >
      <div class="demo-img-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
        <Poptip
          title="确定删除吗？"
          confirm
          transfer
          @on-ok="handleRemove(ind)"
        >
          <Icon type="ios-trash-outline"></Icon>
        </Poptip>
      </div>
    </div>
    <Upload
      :before-upload="handleBeforeUpload"
      multiple
      action="x"
      type="drag"
      style="display: inline-block; width: 58px"
      :accept="conf.accept"
      v-show="!full || !conf.hiddeSelectWhenFull"
    >
      <Icon
        style="height: 58px; line-height: 58px"
        type="ios-camera"
        size="20"
      ></Icon>
    </Upload>
  </div>
</template>
<script>
import { _mixin } from "./imgConfig";
import { _mixin as _compress_mixin } from "./imgCompress";
const loadingFile = Symbol("file");

export default {
  props: {
    imgHolders: {
      required: true,
      type: Array,
      validator(arr) {
        if (!arr) {
          return false;
        }
        for (let item of arr) {
          if (item === null || typeof item !== "object") {
            return false;
          }
        }
        return true;
      },
    },
  },
  data() {
    return {
      conf: null,
      reviewImgUrl: "",
      modal4preview: false,
      isUploading: false,
    };
  },
  mixins: [_mixin, _compress_mixin],
  methods: {
    handleView(picObj) {
      this.reviewImgUrl = picObj[this.conf.url];
      this.modal4preview = true;
    },
    handleRemove(index) {
      if (typeof this.conf.matchBy === "function") {
        this.imgHolders[index][this.conf.url] = "";
        this.imgHolders[index][this.conf.file] = undefined;
        this.imgHolders[index][this.conf.key] = "";
        this.$emit("imgsChange", [index]);
        this.$forceUpdate();
      } else {
        this.imgHolders.splice(index, 1);
        const inds = [];
        for (let i = index; i <= this.imgHolders.length; i++) {
          inds.push(i);
        }
        this.$emit("imgsChange", inds);
      }
    },

    handleBeforeUpload(file) {
      if (/image/.test(file.type)) {
        let ind = this.findMatchIndex(file, this.imgHolders);
        if (ind >= 0) {
          this.imgHolders[ind][loadingFile] = file;
          this.imgHolders[ind][this.conf.url] = "notnull";
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
      const inds = [],
        reqs = [];

      this.imgHolders.forEach((ele, ind) => {
        if (!ele[loadingFile]) {
          return;
        }
        let file = ele[loadingFile];
        ele[loadingFile] = undefined;
        inds.push(ind);
        reqs.push(
          this.compressFile(file).then((newFile) => {
            this.$set(
              this.imgHolders[ind],
              this.conf.url,
              window.URL.createObjectURL(newFile)
            );
            this.$set(this.imgHolders[ind], this.conf.file, newFile);
            this.$set(this.imgHolders[ind], this.conf.key, "");
          })
        );
      });
      Promise.all(reqs).then(() => {
        if (inds.length) {
          this.$forceUpdate();
          this.$emit("imgsChange", inds);
        }
      });
    },
  },
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
