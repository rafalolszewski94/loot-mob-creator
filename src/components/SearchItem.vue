<script setup lang="ts">
import { computed, ref } from "vue";
import { useFuse } from "@vueuse/integrations/useFuse";

import TextField from "../components/TextField.vue";
import Item from "../components/Item.vue";
import items from "../utils/items.json";

type Item = {
  name: string;
  id: number;
};

const emit = defineEmits<{
  (e: "select-item", item: Item): void;
}>();

const mapItems = items.items.map((item) => item.name);

const getItemInfo = (itemRefIndex: number) => {
  return items.items[itemRefIndex];
};

const query = ref("");

const { results } = useFuse<Item>(query, mapItems, { resultLimit: 5 });

const filteredResults = computed(() => {
  return [...results.value]
    .map((r) => getItemInfo(r.refIndex))
    .filter((item) => {
      if (!item.id || !item.name) return false;
      return true;
    });
});

const selectItem = (item: Item) => {
  emit("select-item", item);
};
</script>

<template>
  <div>
    <TextField v-model="query" placeholder="Search item..." />

    <div class="space-y-1 mt-2" v-if="results.length">
      <Item
        class="border border-zinc-700 hover:bg-white/5 cursor-pointer rounded-md px-2 py-2"
        :item="result"
        v-for="result in filteredResults"
        :key="result.refIndex"
        @click="selectItem(result)"
      />
    </div>
  </div>
</template>
