<template>
  <div>
    <MobilePreview style="margin-left:22px">hello 00 world!</MobilePreview>
    <MobilePreview style="margin-left:22px" deviceSetable>hello 00 world!</MobilePreview>
  </div>
</template>

<script>
export default {
  name: "TestMobilePreview",
  label: "手机预览"
  // 这里name不能和已有组件同名，如这里不能是MobilePreview，因为已经用了MobilePreview。否则会报错：Maximum call stack size exceeded
  // maxLength="7" 不能这样写！因为html规范部分大小写，且推荐小写；格式化后，编辑器会改为小写，然后就报错了。
};
</script>

<style>
</style>