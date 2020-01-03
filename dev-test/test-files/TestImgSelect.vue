<template>
  <div>
      <!-- 默认批量数量无限的选择图片，删除后再上传，会在后面追加，前面不会存在空的位置 -->
    <ImgSelect :imgList="imgList1" />
    <!-- 必须指定位置，依次 -->
    <ImgSelect :imgList="imgList2" hasPlace />
    <ImgSelect :imgList="imgList3" hiddeSelectWhenFull hasPlace />
    <ImgSelect :imgList="imgList4" :matchFn="matchFn" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList1: [],
      imgList2: [{}, {}, {}, {}],
      imgList3: [{}, {}, {}, {}],
      imgList4: [{}, {}, {}, {}, {}]
    };
  },
  methods: {
    matchFn(file) {
      // 按文件名称顺序匹配
      let ind = Number.parseInt(file.name) - 1;
      if (this.imgList4[ind]) {
        return ind;
      }
    }
  }
};
</script>

<style>
</style>