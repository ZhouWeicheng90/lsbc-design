<template>
  <div>
    <h1 class="content-left-side">ImgSelect 图片选择</h1>
    <p>
      顾名思义，这个组件是选择图片的，仅仅是选择图片，不会上传！ 当真正上传图片前，会频繁调整图片，或者PE明确要求在提交表单时才统一上传图片，这个组件就很方便！
      <br />该组件是基于view-design（iview的4+版本）的
      <code>Upload组件</code>封装而来。除了选择图片，还会自动对图片进行压缩（采用了
      <code>image-compressor.js</code>插件）。
    </p>
    <EG1 /> 
  </div>
</template>

<script>
import EG1 from "./coms/ImgSelectDoc01";

export default {
  name: "TestImgSelect",
  label: "ImgSelect 图片选择",
  components: { EG1 }
};
</script>

<style>
</style>