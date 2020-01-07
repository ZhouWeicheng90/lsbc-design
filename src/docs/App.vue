<template>
  <div>
    <TestUploadService />
    <br>
    <TestImgSelect />
    <TestMobilePreview />
  </div>
</template>

<script>
import TestImgSelect from "./views/TestImgSelect";
import TestMobilePreview from "./views/TestMobilePreview";
import TestUploadService from "./views/TestUploadService";
// 关于服务的测试，目前请使用打包后的，具体原因就是打包兼容的问题：

export default {
  name: "App",
  components: { TestImgSelect, TestMobilePreview, TestUploadService }
};
</script>

<style>
</style>
