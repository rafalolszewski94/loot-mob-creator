<script setup lang="ts">
const model = defineModel();

const props = defineProps<{
  id?: string;
  placeholder?: string;
}>();

// include characters to this id
const generateId = () => {
  return Math.random().toString(36);
};

const id = props.id || generateId();
</script>

<template>
  <div :class="$style['input-wrapper']">
    <label :for="id"></label>
    <input
      :id="id"
      v-model="model"
      :placeholder="props.placeholder"
      :class="$style.input"
    />
  </div>
</template>

<style module lang="scss">
.input-wrapper {
  @apply w-full block;
}
.input {
  @apply w-full items-center gap-2 rounded-lg pl-4 pr-4 py-2.5 text-sm ring-1 transition flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 focus:ring-green-300/50 outline-none;
}
</style>
