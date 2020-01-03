<template>
  <div id="app">
    <TestImgSelect />
    <MobilePreview style="margin-left:22px">hello 00 world!</MobilePreview>
    <br />
    <br />
  </div>
</template>

<script>
import TestImgSelect from "./test-files/TestImgSelect";
import { UploadService as sFn, test } from "../dist/service";
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
  components: { TestImgSelect },
  methods: {},
  mounted() {
    console.log(test, sFn);
  }
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
