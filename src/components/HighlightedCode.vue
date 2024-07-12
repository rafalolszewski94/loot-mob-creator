<script setup lang="ts">
import { codeToHtml } from "shiki";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  code: string;
}>();

const highlightedCode = ref("");

watchEffect(() => {
  codeToHtml(props.code, {
    lang: "lua",
    theme: "one-dark-pro",
  }).then((html) => {
    highlightedCode.value = html;
  });
});
</script>

<template>
  <div v-html="highlightedCode"></div>
</template>

<style lang="scss" scoped>
:deep(.shiki) {
  @apply p-10;
}
</style>
