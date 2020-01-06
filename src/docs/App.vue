<template>
  <div>
    <TestImgSelect />
    <TestMobilePreview />
  </div>
</template>

<script>
import TestImgSelect from "./views/TestImgSelect";
import TestMobilePreview from "./views/TestMobilePreview";
// 关于服务的测试，目前请使用打包后的，具体原因就是打包兼容的问题：
import x from "../../dist/service.js";
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
  components: { TestImgSelect, TestMobilePreview },
  methods: {},
  mounted() {
    let s = new x.UploadService(
      () => {
        return { key: "abc" };
      },
      () => {
        return {};
      },
      1
    );
    s.uploadMutiple([{}], () => {
      console.log("===");
    });
    console.log(x.test, x.UploadService);
  }
};
</script>

<style>
</style>
