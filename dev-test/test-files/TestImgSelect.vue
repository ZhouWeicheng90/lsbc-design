<template>
  <div>
    <ImgSelect :imgList="imgList1" />
    <ImgSelect :imgList="imgList2" hiddeSelectWhenFull equalProportion />
    <ImgSelect :imgList="imgList3" :hasPlace="false" />
    <ImgSelect :imgList="imgList4" :findMatchIndex="matchFn" />
    <ImgSelect
      :imgList="imgList5"
      :findMatchIndex="()=>0"
      showCompressLog
      compressQuality="0.6"
      compressMaxWidth="2400"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList1: [{}, {}, {}, {}],
      imgList2: [{}, {}, {}, {}],
      imgList3: [],
      imgList4: [{}, {}, {}, {}, {}],
      imgList5: [{}]
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