<template>
  <monacoEditor></monacoEditor>
</template>

<script lang="ts">
import monacoEditor from "./components/monacoEditor";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    monacoEditor,
  },
});
</script>

<style lang="less"></style>
