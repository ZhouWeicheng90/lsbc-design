<template>
  <pre>
<code v-html="initHtml(codeStr)"></code>
</pre>
</template>

<script>
export default {
  props: {
    codeStr: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hidden: false
    };
  },
  methods: {
    initHtml(str) {
      return str
        .replace(/<(\/?)(\w+)/g, `&lt;$1<span class="code-tag">$2</span>`)
        .replace(/;;/g, "<br>")
        .replace(/(\/\*.*\*\/)/g, `<span class="code-notes">$1</span>`)
        .replace(
          /(export|return|default|let|import)/g,
          `<span class="code-key">$1</span>`
        );
    }
  }

  //   functional: true
};
</script>

<style lang='less'>
pre {
  border: 1px solid #ddd;
  background-color: #eee;
  border-radius: 3px;
  padding: 0.5em 2em;
}

code {
  background-color: #eee;
}

.code-notes {
  color: rgb(106, 153, 85);
}

.code-key {
  color: rgb(197, 134, 192);
}

.code-tag {
  color: rgb(66, 66, 150);
}
.code-string {
  color: rgb(206, 145, 106);
}
</style>