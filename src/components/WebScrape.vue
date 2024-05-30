<script setup lang="ts">
import { ref } from "vue";

const mobName = ref("Orc");
const result = ref("");
const test = ref<HTMLDivElement | null>(null);

const scrape = async () => {
  try {
    const html = await window.api.fetchHTML(mobName.value);
    result.value = html;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    if (test.value) {
      const elements = doc
        .querySelectorAll(".loot_list ")[0]
        .querySelectorAll("tbody>tr");
      const elementsArray = Array.from(elements);
      const htmlStrings = elementsArray.map((element) => element.outerHTML);
      const resultString = htmlStrings.join("");

      test.value.innerHTML = resultString;
    }
  } catch (error) {
    result.value = `Error: ${error.message}`;
  }
};
</script>

<template>
  <div class="space-y-2">
    <div>
      <input
        v-model="mobName"
        placeholder="Mob name from Tibia Wiki"
        class="w-full h-10 items-center gap-2 rounded-lg pl-4 pr-4 text-sm ring-1 transition ui-not-focus-visible:outline-none flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 focus:ring-green-300/50 outline-none"
      />
    </div>
    <div class="hidden">
      <textarea
        v-model="result"
        class="w-full min-h-24 items-center gap-2 rounded-lg pl-4 pr-4 text-sm ring-1 transition ui-not-focus-visible:outline-none flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 focus:ring-green-300/50 outline-none"
      ></textarea>
    </div>
    <button
      class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20 hover:bg-red-400/10 hover:text-red-300 hover:ring-red-300"
      @click="scrape"
    >
      Send
    </button>
    <table>
      <thead></thead>
      <tbody ref="test"></tbody>
    </table>
  </div>
</template>
