<template>
  <div>
    <ImgSelect
      :imgHolders="imgHolders"
      :config="config"
      :compress="compress"
      @imgsChange="onImgsChange"
    />
    <div v-for="(img, i) in imgHolders" :key="i">{{ img }}</div>
  </div>
</template>

<script>
import ImgSelect from "../lib/components/img-select/ImgSelect";
// import axios from "axios";
export default {
  components: { ImgSelect },
  data() {
    return {
      imgHolders: [{}, {}],
      config: {
        equalProportion: true,
        /**
         * @param {File} file
         * @param {object[]} list
         */
        matchBy: { maxLen: 6 },
        hiddeSelectWhenFull: true,
        key: 0,
        url: 1,
      },
      compress: {
        enable: (file) => file.size > 10 << 10,
        showLog: true,
        maxWidth: 1600,
        quality: 0.6,
        // mimeType:'image/jpeg',
        convertSize: 10000 * 1024,
      },
    };
  },
  methods: {
    onImgsChange(inds) {
      this.inds = inds;
    },
  },
  mounted() {
    // axios({
    //   method: "post",
    //   data: { name: "999" },
    //   url: "http://test.agent.muyuhuajiaoyu.com/agent/activityCustom/add",
    // });
  },
};
</script>

<style>
</style>