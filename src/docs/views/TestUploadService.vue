<template>
  <div>
    <ImgSelect :imgList="imgList" ref="imgs" @imgsChange="$forceUpdate()" />
    <Button @click="uplImgPrivate">私有上传单张</Button>&nbsp; &nbsp; &nbsp;
    <Button @click="uplImgPublic">公有上传单张</Button>
    <div style="margin:.35em 0" />
    <Button @click="uplImgsPrivate">私有上传多张</Button>&nbsp; &nbsp; &nbsp;
    <Button @click="uplImgsPublic">公有上传多张</Button>
    <div style="margin-bottom:1em" v-for="(item,ind) in imgList" :key="ind">
      file:{{item.file}}
      <br />
      key:{{item.key}}
      <br />
      url:{{item.url}}
    </div>
  </div>
</template>

<script>
import x from "../../deploy/service.js";

export default {
  name: "TestUploadService",
  label: "文件上传",
  data() {
    return {
      imgList: [{}, {}, {}],
      uploadService: null
    };
  },
  methods: {
    uplImgPrivate() {
      this.uploadService.uploadPrivateOne(this.imgList[0].file, 1).then(res => {
        this.$forceUpdate();
        console.log("private:", res);
      });
    },
    uplImgPublic() {
      this.uploadService.uploadOne(this.imgList[0].file, 1).then(res => {
        this.$forceUpdate();
        console.log("public:", res);
      });
    },
    uplImgsPrivate() {
      this.uploadService.uploadPrivateMutiple(this.imgList, 1).then(res => {
        this.$refs.imgs.$forceUpdate();
        this.$forceUpdate();
        console.log(this.imgList);
      });
    },
    uplImgsPublic() {
      this.uploadService.uploadMutiple(this.imgList, 1).then(res => {
        this.$refs.imgs.$forceUpdate();
        this.$forceUpdate();
        console.log(this.imgList);
      });
    }
  },
  mounted() {
    this.uploadService = new x.UploadService(() => {
      return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Nzg0MTg5ODAsInVzZXJuYW1lIjoiYWRtaW4ifQ.YiWYvCkOp47uWS5KfwNk8vYQuexP482WHtfrU3g54Kk";
    }, "/sss");
  }
};
</script>

<style>
</style>