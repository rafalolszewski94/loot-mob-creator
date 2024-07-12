<script setup lang="ts">
const props = defineProps<{
  item: {
    name: string;
    id?: number;
  };
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="relative overflow-hidden size-10">
      <img
        :src="`https://item-images.ots.me/latest_otbr/${item.id}.png`"
        class="absolute -top-7 left-1"
        alt=""
      />
    </div>
    <span>{{ item.name }}</span>
    <span class="text-sm opacity-50">{{ item.id }}</span>
  </div>
</template>
