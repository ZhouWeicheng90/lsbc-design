<template>
  <div>
    <div>默认的使用方式。有place概念，当删除时，位置仍在，下次添加会先填满空位置。必须提前有n个位置，最多传入n个文件。（n此处为4）</div>
    <ImgSelect :imgList="imgList1" />
    <br />
    <div>
      设置maxLength，有place概念（默认）。不用预设n个位置，最多传入maxLength（此处为7）个文件，会自动增加位置。当删除时，新增的位置仍在
      <br />如果设置的maxLength比n小，设置的maxLength无效，和不设一样
    </div>
    <ImgSelect :imgList="imgList1_1" maxlength="7" />
    <br />
    <div>此处采用默认的，位置个数4个。设置了 hiddeSelectWhenFull 和 equalProportion. 设置了hiddeSelectWhenFull，不能同时设置hasplace为false</div>
    <ImgSelect :imgList="imgList2" hiddeSelectWhenFull equalProportion />
    <br />
    <div>设置为没有位置（hasplace=false），如果没设maxLength，可以传无限个；否则最多传maxLength个。删除后，位置跟着删除了，下次添加只会在末尾增加</div>
    <ImgSelect :imgList="imgList3" :hasPlace="false" />
    <ImgSelect :imgList="imgList3_1" :hasPlace="false" maxlength="7" />
    <br />

    <div>
      自定义匹配函数（此处 图片名称 对应 位置顺序，如3.jpg，对应第三个(index==2的）位置），hasplace只能是true(设置false无效)
      <br />提供imgsChange输出，返回变动的下标。
    </div>
    <ImgSelect :imgList="imgList4" :findMatchIndex="matchFn" @imgsChange="imgsChange" />
    <div>开启压缩日志 showCompressLog，设置 压缩质量compressQuality 和 最大压缩宽度compressMaxWidth。</div>
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
      imgList1_1: [{}, {}],
      imgList2: [{}, {}, {}, {}],
      imgList3: [],
      imgList3_1: [],
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
    },
    imgsChange(inds) {
      console.log(inds);
    }
  }
};
</script>

<style>
</style>