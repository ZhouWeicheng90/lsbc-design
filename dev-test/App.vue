<template>
  <div id="app">
    <ImgSelect :imgList="imgList1" />
    <br />
    <hr />
    <br />
    <ImgSelect :imgList="imgList2" :matchListFn="matchListFn" :noSelectWhenFull="true" />
    <br />
    <hr />
    <br />
    <Button @click="upload1">上传列表21</Button>
  </div>
</template>

<script>
import { upload as sFn } from "../dist/service";
export default {
  name: "App",
  data() {
    return {
      imgList1: [
        { url: "", caption: "a", name: "n1" },
        { url: "", caption: "b", name: "n2" },
        { url: "", caption: "c", name: "n3" }
      ],
      imgList2: [{ url: "" }, { url: "" }, { url: "" }]
    };
  },
  methods: {
    matchListFn(file, imgList) {
      // let ind = Number.parseInt(file.name) - 1;
      // if (imgList[ind]) {
      //   return ind;
      // }
      return 0;
      // for (let i = 0; i < imgList.length; i++) {
      //   if (
      //     imgList[i].caption ===
      //     file.name.substring(0, file.name.lastIndexOf("."))
      //   ) {
      //     return i;
      //   }
      // }
      return -1;
    },
    async upload1() {
      console.log(this.imgList1);
      // let mediaType = 1;
      // let s = new sFn("getTokenFn", "getUrlFn", mediaType);
      // let list = this.imgList1.filter(item => item.file);
      // await s.uploadMutiple(list, (res, item) => {
      //   item.imgUrl = res.url;
      //   item.imgKey = res.key;
      // })
      //

      // s.uploadOne(this.imgList1[0].file).then(res => {});
    }
  },
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
