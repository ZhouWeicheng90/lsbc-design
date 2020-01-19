<template>
  <div>
   


    <h3>imgList 与 hasPlace 属性：</h3>
    <div style="display:flex;" class="p">
      <div style="width:50em">
        使用组件你必须传入一个
        <code>imgList</code>，类型是对象数组。数组中每个元素就是一个放置图片的
        <marK>位置</marK>。
        <br />
        
        <br />可以看到最多能选择三张图片，这是因为
        <code>imgList</code>只有三个放置图片的位置。(代码在右侧)
        <br />
        <br />为什么要有place的概念？
        <br />考虑一下这个需求：
        <br />
        <br />接下来按下面的操作，来理解hasPlace的含义：
        <br />1、选好3张，再删除第一张图片。
        <br />2、接下来再选择一张新图片，新图片插入在了第一个位置！！
        <br />这是因为删除图片时，仅仅删除了
        <b>位置</b>上的图片信息，位置仍在！
        <br />
        <br />
        <mark>
          hasPlace为true时（默认就是true），每次选择图片，会找到第一个空的位置，在该位置插入图片，当所有位置都占满了，找不到新的位置时，将无法继续添加新图片。
          <br />删除图片时保留位置。
        </mark>
      </div>
      <pre style="flex:1"><code>
&lt;template&gt;
  &lt;ImgSelect :imgList="imgList" /&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  data() {
    return {
      imgList: [{}, {}, {}]
    };
  }
};
&lt;/script&gt;        </code></pre>
    </div>
    <div style="margin:-1.5em 1em -.5em" />

    <div style="display:flex;" class="p">
      <div style="width:50em">
        <ImgSelect :imgList="imgList3" :hasPlace="false" />
        <br />设置
        <code>:hasPlace="false"</code>会发现两个变化：
        <br />1、删除已有图片后，位置不保留，下次选择的新图片是插入在了末尾。
        <br />2、可以插入无限张图片了，这是因为没有了位置的概念，自然就不受
        <code>imgList.length</code>的影响了。
        <br />
        <mark>hasplace设为false，默认可以选择无限多张图片。</mark>
      </div>
      <pre style="flex:1"><code>
&lt;ImgSelect :imgList="imgList2" :hasPlace="false" /&gt; 
        </code></pre>
    </div>
    <br />
    <h3>max-length 属性：</h3>
    <div class="p">设置最多传入</div>

    <br />
    <div>
      设置max-length，有place概念（默认）。不用预设n个位置，最多传入max-length（此处为7）个文件，会自动增加位置。当删除时，新增的位置仍在
      <br />如果设置的max-length比n小，设置的max-length无效，和不设一样
    </div>
    <ImgSelect :imgList="imgList1_1" max-length="7" />
    <br />
    <div>此处采用默认的，位置个数4个。设置了 hiddeSelectWhenFull 和 equalProportion. 设置了hiddeSelectWhenFull，不能同时设置hasplace为false</div>
    <ImgSelect :imgList="imgList2" hiddeSelectWhenFull equalProportion />
    <br />
    <div>设置为没有位置（hasplace=false），如果没设max-length，可以传无限个；否则最多传max-length个。删除后，位置跟着删除了，下次添加只会在末尾增加</div>

    <ImgSelect :imgList="imgList3_1" :hasPlace="false" max-length="7" />
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
  name: "TestImgSelect02",
  label: "ImgSelect 图片选择（旧）",
  data() {
    return {
      imgList: [{}, {}, {}],
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