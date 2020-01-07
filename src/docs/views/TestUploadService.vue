<template>
  <div>
    <ImgSelect :imgList="imgList1" />
    <Button @click="upl">上传</Button>
  </div>
</template>

<script>
import x from "../../deploy/service.js";

export default {
  data() {
    return {
      imgList1: [{}],
      uploadService: null
    };
  },
  methods: {
    upl() {
      this.uploadService.uploadOne(this.imgList1[0].file, 1).then(res=>{
          console.log(res)
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