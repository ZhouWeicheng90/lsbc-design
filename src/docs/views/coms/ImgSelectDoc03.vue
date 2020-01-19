<template>
  <div>
      <ImgSelect :imgList="imgList1" hiddeSelectWhenFull equalProportion />
      <ImgSelect
      :imgList="imgList2"
      :findMatchIndex="()=>0"
      showCompressLog
      compressQuality="0.6"
      compressMaxWidth="2400"
    />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>