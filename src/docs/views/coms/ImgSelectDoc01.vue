<template>
  <div>
    <a href="#chapt1">
      <h3 class="content-left-side sticky-link" style="top:0;">精准匹配</h3>
    </a>
    <div style="display:flex;">
      <a name="chapt1"></a>
      <div
        style="width:51em;"
        class="p"
      >
        <div style="margin-bottom:50px">
          示例：
          <div class="quote">
            有一组'书'对象，现在需要为每本书添加一张封面图片，我们批量选择所有图片，并让这些图片按名称（图片的名称等于书的名称）
            <b>精准匹配</b> 到不同的书上。
          </div>
          <div>体验一下效果:</div>
          <div>批量选择大量图片，你会发现只有将图片名称命名为三个书名中的一种，图片才有可能会匹配上，并且自动排好对应的位置!</div>
          <div>注意右侧代码的关键配置：imgList 和 findMatchIndex！</div>
          <ImgSelect style="margin:2em auto" :imgList="imgList" :findMatchIndex="matchFn" />
        </div>

        <div>
          问：要按序号匹配（1.jpg，2.png，3.jpg分别匹配第1,2,3个位置）该怎么写
          <code>findMatchIndex</code> ？
          <br />核心代码很简单：
          <CodeView codeStr="let ind = +fileName - 1 
return list[ind] ? ind : -1" />
        </div>
      </div>

      <CodeView
        style="flex:1"
        codeStr="<template>
  <ImgSelect :imgList='imgList' :findMatchIndex='matchFn' />
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        {
          bookName: 'Linux系统详解'
          /** other fileds omited ... */
        },
        {
          bookName: 'C/C++开发'
          /** other fileds omited ... */
        },
        {
          bookName: 'Webpack4.0手册'
          /** other fileds omited ... */
        }
      ]
    }
  },
  methods: {
    matchFn(file, list) {
      let fileName = file.name.substring(0, file.name.lastIndexOf('.'))
      /** 根据bookName和图片名称 进行精准匹配（忽略掉 / \ < 等无法命名文件的字符）： */
      return list.findIndex(
        ele => ele.bookName.replace(/[/:*?'<>|\]/g, '') === fileName
      )
    }
  }
}
</script>"
      />
       
    </div>
   <a name="chapt2"></a>
    <a href="#chapt2">
      <h3 class="content-left-side sticky-link" style="top:25px;">maxLength和hasPlace配置</h3>
    </a>
    
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
      <CodeView
        codeStr="<template>
  <div style='width:53em' class='p'>
    <ImgSelect :imgList='imgList1' />
    <br />
    <ImgSelect :imgList='imgList2' :max-length='6' />
    <br />
    <ImgSelect :imgList='imgList3' :max-length='2' />
    <br />
    <br />
    <b>hasPlace设置为false的情况：</b>
    <br />
    <ImgSelect :imgList='imgList4' :hasPlace='false' />
    <br />
    <ImgSelect :imgList='imgList5' :hasPlace='false' :max-length='6' />
    <br />
    <ImgSelect :imgList='imgList6' :hasPlace='false' :max-length='2' />
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
</script>"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        {
          bookName: "Linux系统详解"
          /** other fileds omited ... */
        },
        {
          bookName: "C/C++开发"
          /** other fileds omited ... */
        },
        {
          bookName: "Webpack4.0手册"
          /** other fileds omited ... */
        }
      ],
      imgList1: [{}, {}, {}, {}],
      imgList2: [{}, {}, {}, {}],
      imgList3: [{}, {}, {}, {}],
      imgList4: [{}, {}, {}, {}],
      imgList5: [{}, {}, {}, {}],
      imgList6: [{}, {}, {}, {}]
    };
  },
  methods: {
    matchFn(file, list) {
      let fileName = file.name.substring(0, file.name.lastIndexOf("."));
      return list.findIndex(
        ele => ele.bookName.replace(/[/:*?"<>|\\]/g, "") === fileName
      );
    }
  }
};
</script>