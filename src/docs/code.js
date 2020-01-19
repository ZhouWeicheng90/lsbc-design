let str = `
<template>
  <div style="width:53em" class="p">
    <ImgSelect :imgList="imgList1" />
    <br />
    <ImgSelect :imgList="imgList2" max-length="6" />
    <br />
    <ImgSelect :imgList="imgList3" max-length="2" />
    <br />
    <br />
    <b>hasPlace设置为false的情况：</b>
    <br />
    <ImgSelect :imgList="imgList4" :hasPlace="false" />
    <br />
    <ImgSelect :imgList="imgList5" :hasPlace="false" max-length="6" />
    <br />
    <ImgSelect :imgList="imgList6" :hasPlace="false" max-length="2" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList1: [{}, {}, {}, {}],
      imgList2: [{}, {}, {}, {}],
      imgList3: [{}, {}, {}, {}],
      imgList4: [{}, {}, {}, {}],
      imgList5: [{}, {}, {}, {}],
      imgList6: [{}, {}, {}, {}]
    };
  }
};
</script>

`
console.log(
  str.replace(/<(\/?)(\w+)/g, `&lt;$1<span class="code-tag">$2</span>`)
    .replace(/(\/\*.*\*\/)/g, `<span class="code-notes">$1</span>`)
    .replace(/(export|return|default|let|import)/g, `<span class="code-key">$1</span>`)

)