<template>
  <div
    ref="targetEl"
    :style="`min-height:${fixedMinHeight ? fixedMinHeight : minHeight}px`"
  >
    <slot v-if="shouldRender" />
  </div>
</template>

<script>
import Vue from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default Vue.extend({
  name: "App",
  props: {
    renderOnIdle: Boolean,
    unrender: Boolean,
    minHeight: Number,
    unrenderDelay: {
      type: Number,
      default: 10000,
    },
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onIdle(cb = () => {}) {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(cb);
      } else {
        setTimeout(() => {
          this.$nextTick(cb);
        }, 300);
      }
    },
  },

  data: () => ({
    shouldRender: false,
    fixedMinHeight: 0,
    unrenderTimer: null,
    renderTimer: null,
  }),
  mounted() {
    const { stop } = useIntersectionObserver(
      this.$refs.targetEl,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          clearTimeout(this.unrenderTimer);
          this.renderTimer = setTimeout(
            () => (this.shouldRender = true),
            this.unrender ? 200 : 0
          );
          this.shouldRender = true;
          if (!this.unrender) {
            stop();
          }
        } else if (this.unrender) {
          clearTimeout(this.renderTimer);
          this.unrenderTimer = setTimeout(() => {
            this.fixedMinHeight = this.$refs.targetEl.clientHeight;
            this.shouldRender = false;
          }, this.unrenderDelay);
        }
      },
      {
        rootMargin: "600px",
      }
    );
  },
});
</script>

<style scoped>
</style>
