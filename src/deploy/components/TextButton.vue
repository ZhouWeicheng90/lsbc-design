<template>
  <div :class="type">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    }
  }
};
</script>

<style scoped lang='less'>
// @import '~view-design/src/styles/index.less';
// .primary{
//     color: @primary-color;
// }
</style>