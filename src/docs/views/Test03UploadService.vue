<template>
  <div>
    <h3>图片上传</h3>
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
    <div>
      <h3>音频上传：</h3>
      <input type="file" @change="upAudio" accept="audio/*" />
      <Button @click="upAudioPrivate">私有上传音频</Button>
      <Button @click="upAudioPublic">公有上传音频</Button>
    </div>
  </div>
</template>

<script>
import {UploadService} from "../../lib/service.js";

export default {
  name: "TestUploadService",
  label: "文件上传服务",
  data() {
    return {
      imgList: [{}, {}, {}],
      uploadService: null,
      audioFile: null
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
      this.uploadService.uploadPrivateMutiple(this.imgList, 1).then(() => {
        this.$refs.imgs.$forceUpdate();
        this.$forceUpdate();
        console.log(this.imgList);
      });
    },
    uplImgsPublic() {
      this.uploadService.uploadMutiple(this.imgList, 1).then(() => {
        this.$refs.imgs.$forceUpdate();
        this.$forceUpdate();
        console.log(this.imgList);
      });
    },
    upAudio(e) {
      this.audioFile = e.target.files[0];
    },
    upAudioPrivate() {
      this.uploadService.uploadPrivateOne(this.audioFile, 2).then(res => {        
        console.log("audio private:", res);
      });
    },
    upAudioPublic() {
      this.uploadService.uploadOne(this.audioFile, 2).then(res => {        
        console.log("audio public:", res);
      });
    }
  },
  mounted() {
    this.uploadService = new UploadService(() => {
      return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Nzg0MTg5ODAsInVzZXJuYW1lIjoiYWRtaW4ifQ.YiWYvCkOp47uWS5KfwNk8vYQuexP482WHtfrU3g54Kk";
    }, "/sss");
  }
};
</script>

<style>
</style>