<template>
  <div>
    <h3>精准匹配初体验</h3>
    <div style="display:flex;">
      <div style="width:53em" class="p">
        为了更快的掌握这个组件的用法，我们从一个需求案例出发：
        <div class="quote">
          有一组'书'对象，现在需要为每本书添加一张封面图片，我们批量选择所有图片，并让这些图片按名称（图片的名称等于书的名称）
          <b>精准匹配</b> 到不同的书上。
        </div>
        <br />你可以先看下方的演示效果，或者右侧的实现代码：
        <div style="text-align:center;padding:2em 0">
          <ImgSelect :imgList="imgList" :findMatchIndex="matchFn" />
        </div>
        <div>
          示例代码解释：
          <ol style="padding:.5em 1em;">
            <li>传入的属性 imgList 表示有三本书（Linux系统详解、C/C++开发、Webpack4.0手册）需要匹配封面。</li>
            <li>imgList 是 Array&lt;Object> 类型的必需属性。</li>
            <li>findMatchIndex 属性接收一个函数matchFn，用来定义图片的匹配规则。最多可以接收两个参数，其中 list 参数实际就是imgList。函数应该返回匹配的下标。</li>
            <li>示例中 matchFn 先取到图片名称（去掉后缀），然后找到书面和图片名相等的下标。（这里先把书面的特殊字符过滤掉再比较）</li>
          </ol>
          <span>
            每当你选择图片时，就会这样进行精确匹配。
            <br />体验一下效果，批量选择大量图片，你会发现只有将图片名称命名为三个书名中的一种，图片才有可能会匹配上，并且自动排好对应的位置。
            <br />也很容易理解，当你不断的删除图片，匹配图片，最终图片的位置能保持不变。这里是有位置（hasPlace）的概念。
          </span>

          <div style="padding-top:5em">
            问：要按序号精准匹配（1.jpg，2.png，3.jpg分别匹配第1,2,3个位置）该怎么写
            <code>findMatchIndex</code> ？
            <br />
            <br />核心代码很简单：
            <CodeView codeStr="let ind = +fileName - 1 
return list[ind] ? ind : -1"/>           
          </div>
        </div>
      </div>
      <CodeView codeStr="<template>
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
</script>"/>
      
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
      ]
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