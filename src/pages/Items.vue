<script setup lang="ts">
import AppButton from "../components/AppButton.vue";
import { onMounted, onUpdated, ref } from "vue";
import type { Item } from "../../types.d.ts";

const items = ref<Item[]>([]);
const newItem = ref<Item>({
  name: "",
  id: null,
});

const load = async () => {
  const items = await window.api.getStore<Item[]>("items");
  return items;
};

onMounted(async () => {
  items.value = await load();
});

const save = async (items: any) => {
  try {
    await window.api.setStore("items", JSON.parse(JSON.stringify(items)));
  } catch (error) {
    console.error("Error saving items:", error);
  }
};

const addItem = async () => {
  if (!newItem.value.name || !newItem.value.id) {
    return;
  }
  items.value.push(newItem.value);
  await save(items.value);
  newItem.value = { name: "", id: null };
};

const remove = async (item: Item) => {
  items.value = items.value.filter((i) => i !== item);
  await save(items.value);
};

const isEditing = ref(false);
const itemToEdit = ref<Item>();

const toggleEdit = async (item: Item) => {
  isEditing.value = true;
  itemToEdit.value = item;
};

const saveItem = async () => {
  isEditing.value = false;
  if (!itemToEdit.value.name || !itemToEdit.value.id) {
    return;
  }
  items.value.map((i) => {
    if (i.id === itemToEdit.value.id) {
      i.name = itemToEdit.value.name;
      i.id = itemToEdit.value.id;
      return i;
    }
    return i;
  });
  await save(items.value);
};
</script>

<template>
  <div
    class="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8 text-white"
  >
    <main class="flex-auto">
      <article class="flex h-full flex-col pb-10 pt-16">
        <div
          class="flex-auto prose prose-invert !max-w-5xl [html_:where(&amp;>*)]:mx-auto [html_:where(&amp;>*)]:max-w-2xl [html_:where(&amp;>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&amp;>*)]:lg:max-w-3xl"
        >
          <h1>Item mapping</h1>

          <div class="flex flex-col items-center">
            <div class="flex gap-4 flex-1 w-full">
              <input
                v-model="newItem.name"
                v-if="!isEditing"
                placeholder="Item name"
                class="w-full h-10 items-center gap-2 rounded-lg pl-4 pr-4 text-sm ring-1 transition ui-not-focus-visible:outline-none flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 focus:ring-green-300/50 outline-none"
              />
              <input
                v-model.number="newItem.id"
                v-if="!isEditing"
                placeholder="Item ID"
                class="w-full h-10 items-center gap-2 rounded-lg pl-4 pr-4 text-sm ring-1 transition ui-not-focus-visible:outline-none flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 focus:ring-green-300/50 outline-none"
              />
              <input
                v-model="itemToEdit.name"
                v-if="isEditing"
                placeholder="Item name"
                class="w-full h-10 items-center gap-2 rounded-lg pl-4 pr-4 text-sm ring-1 transition ui-not-focus-visible:outline-none flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 focus:ring-green-300/50 outline-none"
              />
              <input
                v-model.number="itemToEdit.id"
                v-if="isEditing"
                placeholder="Item ID"
                class="w-full h-10 items-center gap-2 rounded-lg pl-4 pr-4 text-sm ring-1 transition ui-not-focus-visible:outline-none flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 focus:ring-green-300/50 outline-none"
              />
              <AppButton
                class="text-nowrap shrink-0"
                @click="addItem"
                v-if="!isEditing"
              >
                Add item
              </AppButton>
              <AppButton
                class="text-nowrap shrink-0"
                @click="saveItem"
                v-if="isEditing"
                >Save</AppButton
              >
            </div>
          </div>

          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-8">
            <div
              class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
            >
              <table class="min-w-full divide-y divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                    >
                      Item Name
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Item ID
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-800">
                  <tr v-for="item in items" :key="item.id">
                    <td
                      class="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                    >
                      <div class="inline-flex items-center gap-x-2">
                        <div class="relative overflow-hidden size-10">
                          <img
                            :src="`https://item-images.ots.me/latest_otbr/${item.id}.png`"
                            class="absolute -top-6 left-1"
                            alt=""
                          />
                        </div>
                        <span>
                          {{ item.name }}
                        </span>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-1 text-sm text-neutral-300 align-middle"
                    >
                      <div class="inline-flex items-center gap-x-2">
                        {{ item.id }}
                      </div>
                    </td>
                    <td
                      class="relative whitespace-nowrap py-1 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 align-middle"
                    >
                      <div class="inline-flex items-center gap-x-2">
                        <span
                          @click="remove(item)"
                          class="text-red-400 hover:text-red-300 cursor-pointer"
                          >Delete</span
                        >
                        <span
                          @click="toggleEdit(item)"
                          class="text-blue-400 hover:text-blue-300 cursor-pointer"
                          >Edit</span
                        >
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>
