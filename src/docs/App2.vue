<template>
  <div>
    <ImgSelect
      :imgHolders="imgHolders"
      :config="config"
      :compress="compress"
      @imgsChange="onImgsChange"
    />
    <div v-for="(img,i) in imgHolders" :key="i">{{img}}</div>
  </div>
</template>

<script>
import ImgSelect from "../lib/ImgSelect.vue";
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
        enable: (file) => file.size > 10 << 20,
        showLog: true,
        maxWidth: 1000,
        quality: 0.6,
      },
    };
  },
  methods: {
    onImgsChange(inds) {
      console.log(inds);
    },
  },
};
</script>

<style>
</style>