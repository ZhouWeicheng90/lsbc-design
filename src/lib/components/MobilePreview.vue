<template>
  <div class="preview-wrapper">
    <div
      class="preview-content"
      ref="container"
      :style="{ width: width + 'px', height: height + 'px' }"
      @scroll="onScroll"
    >
      <div
        ref="inner"
        :style="{
          fontSize: deviceFontSize + 'px',
          transform: `scale(${scale})`,
          transformOrigin: `left top`,
          width: deviceWidth + 'px',
          height: deviceHeight + 'px',
        }"
      >
        <slot></slot>
      </div>
    </div>

    <div class="right-toolbar">
      <Icon
        v-if="deviceSetable"
        type="ios-cog"
        class="icon-btn"
        @click.stop="showSetting = true"
      />
      <Icon
        v-else
        type="md-refresh"
        class="icon-btn"
        title="强制刷新"
        @click="reRender()"
      />
      <slot name="right-toolbar"></slot>
    </div>
    <div class="bottom-toolbar">
      <slot name="bottom-toolbar"> </slot>
    </div>

    <div class="form" v-show="showSetting" @click.stop>
      <label>
        显示宽度：
        <input v-model="inW" placeholder="默认350" />
      </label>
      <br />
      <label>
        设备宽度：
        <input v-model="inDW" placeholder="默认1200" />
      </label>
      <label>
        设备高度：
        <input v-model="inDH" placeholder="默认1920" />
      </label>
      <label>
        像素比率：
        <input v-model="inPR" placeholder="默认2" />
      </label>
      <label>
        设备字号（基于css像素）：
        <input v-model="inFontSize" placeholder="默认16" />
      </label>
      <Button size="small" @click="reRender()">重新渲染</Button>
    </div>
  </div>
</template>
<script>
const CACHE_CONFIG_KEY = "enne5w4-mobile-preview-setting-config";
export default {
  props: {
    deviceSetable: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      deviceFontSize: 16,
      width: 350,
      height: 0,
      deviceHeight: 1920,
      deviceWidth: 1200,

      inW: "",
      inDW: "",
      inDH: "",
      inPR: "",
      inFontSize: "",

      scale: 1,
      showSetting: false,
      maxScroll: 0,
    };
  },
  methods: {
    onScroll(e) {
      if (e.target.scrollTop > this.maxScroll) {
        e.target.scrollTop = this.maxScroll;
      }
    },
    reRender() {
      // step1: 由输入生成参数
      this.deviceHeight = (+this.inDH || 1920) / (+this.inPR || 2);
      this.deviceWidth = (+this.inDW || 1200) / (+this.inPR || 2);
      this.width = +this.inW || 350;
      this.deviceFontSize = +this.inFontSize || 16;
      // step2：校验适配，避免异常情况
      if (this.deviceWidth < 300) {
        this.deviceWidth = 300;
      }
      if (this.deviceHeight < 500) {
        this.deviceHeight = 500;
      }
      // 预览宽度比实际宽度：只能缩小，不能放大：
      if (this.width > this.deviceWidth) {
        this.width = this.deviceWidth;
      }

      // step3：开始计算：
      this.height = (this.width * this.deviceHeight) / this.deviceWidth;
      this.scale = this.width / this.deviceWidth;
      this.$emit("change-screen", {
        width: this.deviceWidth,
        height: this.deviceHeight,
      });

      setTimeout(() => {
        this.maxScroll =
          this.$refs.inner.scrollHeight * this.scale - this.height;
      }, 500);
    },

    closeSetingFn(e) {
      if (this.showSetting) {
        this.showSetting = false;
        this.reRender();
        e.stopPropagation();
        e.preventDefault();
      }
    },
  },
  beforeMount() {
    localStorage.removeItem(CACHE_CONFIG_KEY);
    this.reRender();
    window.addEventListener("click", this.closeSetingFn);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeSetingFn);
  },
};
</script>
<style scoped lang='less'>
@rightBorder: 41px;
@bottomBorder: 46px;
.preview-wrapper {
  display: inline-block;
  width: min-content;
  position: relative;
}
.preview-content {
  box-sizing: content-box;
  border-style: solid;
  border-color: #333;
  border-width: 39px @rightBorder @bottomBorder 42px;
  border-radius: 20px;
  box-shadow: 0 0 3px black, 0 0 16px black, 0 0 23px black, 0 0 2px 4px white,
    0 0 1px 5px black;

  background: white;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
}

/* 右侧相关样式： */
.right-toolbar {
  z-index: 99;
  margin-left: -@rightBorder;
  width: @rightBorder;
  position: absolute;
  right: -1px;
  top: 0;
  .icon-btn {
    color: #aaa;
    font-size: 18px;
    margin: 10px auto auto 10px;
    cursor: pointer;
  }
  .icon-btn:hover {
    color: #e1e1e1;
  }
}
.bottom-toolbar {
  position: absolute;
  z-index: 99;
  margin-top: -@bottomBorder;
  height: @bottomBorder;
  width: 100%;
}

/* 表单 */
.form {
  text-align: left;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;

  width: 17em;
  font-size: 12px;
  color: #bbb;

  position: absolute;
  left: 100%;
  top: 0;
  z-index: 999;

  margin: 12px 0 0 6px;
  padding: 2em;

  display: flex;
  flex-flow: column;
  input {
    color: #eee;
    border: 1px solid #aaa;
    border-width: 0 0 1px;
    background: none;
    outline: none;
  }
  input::placeholder {
    color: #bbb;
  }
  label {
    margin-bottom: 0.5em;
  }
  button {
    width: 5.5em;
    margin: 1em auto 0;
    background: rgba(255, 255, 255, 0.18);
    border: none;
    outline: none;
    box-shadow: none;
    color: #eee;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.25);
  }
}
</style>
