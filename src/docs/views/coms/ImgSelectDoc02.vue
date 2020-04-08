<template>
  <div>
    <h3>更灵活多样的配置</h3>
    <div class="p">
      通过 findMatchIndex 我们可以灵活的定制各种匹配规则，只需要配置一下匹配函数就行了。
      <br />此外，组件还对很多常用的场景，提供了更简便的配置方式。当我们不传入 findMatchIndex 属性时，
      还可以通过 hasPlace (Boolean类型，默认true)和 max-length (String|Number 类型，默认无效数字)两个属性的组合，快速得到不同的匹配规则。
      <br />
      <b>注意：</b> max-length 设置为 小于1的数 或 非数字 string 时 无效（和未设置一样）
      <br />
      <b>注意：</b> 一旦你设置了 findMatchIndex 函数，hasPlace 将强制为true，max-length 将始终无效！
      所以本章节是基于未设置 findMatchIndex 的条件下的。
    </div>
    <div style="display:flex;">
      <div style="width:53em" class="p">
        <div style="margin-bottom:1em">
          <b>对应于右侧代码的6个示例，介绍如下：</b>
        </div>
        <div>
          示例1，保留位置，最多
          <code>imgList.length</code> 张：
        </div>
        <ImgSelect :imgList="imgList1" />
        <div style="margin-bottom:2em;padding-top:0" class="quote">
          保留位置什么意思？试着进行如下操作：
          <br />选择4张后，删除第1张和第3张，然后再选择两张，会发现新的图片插入到了第1个和第3个位置，而非追加到末尾。这是因为当hasPlace为true时
        </div>
        <div>
          示例2，保留位置，imgList.length 是4，但最多可以选择6张，因为设置了
          <code>max-length="6"</code> ：
        </div>
        <ImgSelect :imgList="imgList2" :max-length="6" />

        <div style="margin-top:2em">示例3，保留位置，最多选择4张（设置的 max-length 较小无效）：</div>
        <ImgSelect :imgList="imgList3" :max-length="2" />

        <div style="margin:2em 0 .5em">
          <b>hasPlace设置为false的情况：</b>
        </div>
        <div>示例4，不保留位置，可以传入无限多张：</div>
        <ImgSelect :imgList="imgList4" :hasPlace="false" />
        <div style="margin-top:2em">示例5，不保留位置，最多可以传入6张：</div>
        <ImgSelect :imgList="imgList5" :hasPlace="false" :max-length="6" />
        <div style="margin-top:2em">示例6，不保留位置，开始可选择4张（由初始的 imgList 决定），但是不断的删除图片，最后最多只能传入2张：</div>
        <ImgSelect :imgList="imgList6" :hasPlace="false" :max-length="2" />
      </div>

      <pre style="flex:1">
<code>
&lt;<span class="code-tag">template</span>>
  &lt;<span class="code-tag">div</span> style="width:53em" class="p">
    <b>&lt;<span class="code-tag">ImgSelect</span> :imgList="imgList1" /></b>
    &lt;<span class="code-tag">br</span> />
    <b>&lt;<span class="code-tag">ImgSelect</span> :imgList="imgList2" :max-length="6" /></b>
    &lt;<span class="code-tag">br</span> />
    <b>&lt;<span class="code-tag">ImgSelect</span> :imgList="imgList3" :max-length="2" /></b>
    &lt;<span class="code-tag">br</span> />
    &lt;<span class="code-tag">br</span> />
    &lt;<span class="code-tag">b</span>>hasPlace设置为false的情况：&lt;/<span class="code-tag">b</span>>
    &lt;<span class="code-tag">br</span> />
    <b>&lt;<span class="code-tag">ImgSelect</span> :imgList="imgList4" :hasPlace="false" /></b>
    &lt;<span class="code-tag">br</span> />
    <b>&lt;<span class="code-tag">ImgSelect</span> :imgList="imgList5" :hasPlace="false" :max-length="6" /></b>
    &lt;<span class="code-tag">br</span> />
    <b>&lt;<span class="code-tag">ImgSelect</span> :imgList="imgList6" :hasPlace="false" :max-length="2" /></b>
  &lt;/<span class="code-tag">div</span>>
&lt;/<span class="code-tag">template</span>>

&lt;<span class="code-tag">script</span>>
<span class="code-key">export</span> <span class="code-key">default</span> {
  data() {
    <span class="code-key">return</span> {
      imgList1: [{}, {}, {}, {}],
      imgList2: [{}, {}, {}, {}],
      imgList3: [{}, {}, {}, {}],
      imgList4: [{}, {}, {}, {}],
      imgList5: [{}, {}, {}, {}],
      imgList6: [{}, {}, {}, {}]
    };
  }
};
&lt;/<span
  class="code-tag"
>script</span>>
</code>
      </pre>
    </div>
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
<style scoped>
pre code b {
  font-weight: bolder !important;
  text-decoration: underline;
}
</style>
