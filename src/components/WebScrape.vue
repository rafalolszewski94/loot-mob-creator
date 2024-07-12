<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useClipboard } from "@vueuse/core";
import {
  ClipboardDocumentIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";
import AppButton from "./AppButton.vue";
import type { Item } from "../../types.d.ts";
import HighlightedCode from "./HighlightedCode.vue";

const { text, copy, copied, isSupported } = useClipboard();

const mobName = ref("Orc");
const result = ref("");
const test = ref<HTMLDivElement | null>(null);

const percentageToNumber = (percentage: number) => {
  if (percentage < 0 || percentage > 100) {
    throw new Error("Percentage must be between 0 and 100");
  }
  const maxNumber = 100000;
  return Math.floor((percentage / 100) * maxNumber);
};

const items = ref<Item[]>([]);

const load = async () => {
  const items = await window.api.getStore<Item[]>("items");
  return items || [];
};

onMounted(async () => {
  items.value = await load();
});

const itemMapFound = (name: string) => {
  if (!items.value || items.value.length === 0) {
    return;
  }
  return items.value.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
};

const scrape = async () => {
  try {
    const html = await window.api.fetchHTML(mobName.value);
    result.value = html;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    interface LocalItem {
      totalMin: number;
      totalMax: number;
      totalPercentage: number;
      totalKills: number;
      count: number;
    }
    const itemData: Record<string, LocalItem> = {};

    const items: {
      name: string;
      amount_min: number;
      amount_max: number;
      percentage: number;
      kills_to_get_one: number;
      img_url: string;
      chance: number;
    }[] = [];

    const tables = doc.querySelectorAll(".loot_list");
    const tablesToProcess = Array.from(tables).slice(0, 1);
    if (tablesToProcess) {
      tablesToProcess.forEach((table) => {
        const rows = table.querySelectorAll("tbody>tr");

        for (let i = 1; i < rows.length; i++) {
          const columns = rows[i].querySelectorAll("td");
          if (columns) {
            const imgUrl = columns[0]
              .querySelector("img")
              ?.getAttribute("src")
              .trim();
            const name = columns[2].textContent.trim();
            const amountMinMax = columns[1].textContent.trim().split("-");
            const amountMin = amountMinMax[0];
            const amountMax = amountMinMax[1] || amountMinMax[0];
            const percentage = parseFloat(
              columns[5].textContent.trim().replace("%", "")
            );
            const killsToGetOne = parseFloat(columns[6].textContent.trim());

            if (name !== "Empty" && name !== "!Empty") {
              if (!itemData[name]) {
                itemData[name] = {
                  totalMin: 0,
                  totalMax: 0,
                  totalPercentage: 0,
                  totalKills: 0,
                  count: 0,
                };
              }

              itemData[name].totalMin += parseInt(amountMin) || 1;
              itemData[name].totalMax += parseInt(amountMax) || 1;
              itemData[name].totalPercentage += percentage;
              itemData[name].totalKills += killsToGetOne;
              itemData[name].count += 1;

              const item = {
                name: name,
                amount_min: parseInt(amountMin) || 1,
                amount_max: parseInt(amountMax) || 1,
                percentage: percentage,
                kills_to_get_one: killsToGetOne,
                img_url: imgUrl,
                chance: percentageToNumber(percentage),
              };
              items.push(item);
            }
          }
        }
      });

      // Calculate averages for each item
      const averages = Object.entries(itemData).map(([name, data]) => {
        return {
          name: name,
          averageMin: Math.floor(data.totalMin / data.count),
          averageMax: Math.floor(data.totalMax / data.count),
          chance: percentageToNumber(data.totalPercentage / data.count),
          averageKills: data.totalKills / data.count,
        };
      });

      const template = `monster.loot = {${averages.map((it) => {
        if (itemMapFound(it.name)) {
          return `{ id = ${itemMapFound(it.name)?.id}, chance = ${
            it.chance
          }, maxCount = ${it.averageMax} } -- ${it.name}`;
        }
        return `{ name = "${it.name}", chance = ${it.chance}, maxCount = ${it.averageMax} }`;
      })}\n}`;

      function prettyFormatLua(luaCode: string) {
        return luaCode
          .replace(/{\s*name/g, "{ name")
          .replace(/{\s*id/g, "{ id")
          .replace(/},\s*{/g, "},\n    {")
          .replace(/},\s*}/g, "}\n}")
          .replace(/monster\.loot = \{\s*/g, "monster.loot = {\n    ")
          .replace(/,\s*\n    }/g, "\n}")
          .replace(/} -- (.*),{/g, function (match, p1) {
            return `}, -- ${p1}\n    {`;
          }); // handle comments
      }

      if (test.value) {
        test.value.innerHTML = prettyFormatLua(template);
      }

      result.value = prettyFormatLua(template);
    }
  } catch (error) {
    if (test.value) {
      test.value.innerHTML = `Error: ${error.message}`;
    }
  }
};

const copyCode = () => {
  copy(result.value);
};
</script>

<template>
  <div class="space-y-2">
    <div>
      <label for="mob_name">Monster name</label>
      <input
        v-model="mobName"
        id="mob_name"
        name="mob_name"
        placeholder="Mob name from Tibia Wiki"
        class="w-full h-10 items-center gap-2 rounded-lg pl-4 pr-4 text-sm ring-1 transition ui-not-focus-visible:outline-none flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 focus:ring-green-300/50 outline-none"
      />
    </div>
    <AppButton @click="scrape">Generate loot</AppButton>
    <div class="relative" v-show="result">
      <button
        class="absolute top-3 right-3 size-9 inline-flex items-center justify-center border border-zinc-600 ring-4 ring-zinc-700/30 rounded-lg hover:bg-zinc-100/5"
        @click="copyCode"
      >
        <ClipboardDocumentIcon class="size-5" v-if="!copied" />
        <CheckCircleIcon class="size-5 text-green-400" v-if="copied" />
      </button>

      <HighlightedCode
        v-if="result"
        :code="result"
        class="!mt-10 border border-zinc-300/20 rounded-xl overflow-hidden"
      />
    </div>
  </div>
</template>
