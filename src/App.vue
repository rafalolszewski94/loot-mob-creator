<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import {
  MinusIcon,
  ViewfinderCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { computed, ref } from "vue";

const minimizeApp = () => {
  window.api.minimizeApp();
};
const maximizeApp = () => {
  window.api.maximizeApp();
};
const closeApp = () => {
  window.api.closeApp();
};

const currentRoute = useRoute();
const activePageIndex = computed(() => {
  if (currentRoute.path === "/items") {
    return 1;
  }
  return 0;
});
</script>

<template>
  <div class="w-full">
    <div class="w-full">
      <div class="h-full lg:ml-72 xl:ml-80">
        <header
          class="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div
            class="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:border-white/10"
          >
            <div class="hidden lg:flex">
              <a
                aria-label="Home"
                href="/"
                class="h-6 text-white font-black text-xl window-draggable"
                >Loot Mob Creator
              </a>
            </div>
            <div
              class="window-draggable fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 pr-4 pl-4 transition sm:pl-6 lg:left-72 lg:z-30 lg:pl-8 xl:left-80 backdrop-blur bg-zinc-900/[var(--bg-opacity-dark)]"
              style="--bg-opacity-light: 0.5; --bg-opacity-dark: 0.2"
            >
              <div
                class="absolute inset-x-0 top-full h-px transition bg-white/10"
              ></div>
              <div class="hidden lg:max-w-md lg:flex-auto">
                <div class="relative">
                  <input
                    placeholder="Find something..."
                    class="window-non-draggable hidden h-8 w-full items-center gap-2 rounded-full pl-8 pr-3 text-sm ring-1 transition ui-not-focus-visible:outline-none lg:flex bg-white/5 text-zinc-400 ring-inset ring-white/10 hover:ring-white/20"
                  />
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    class="h-5 w-5 stroke-current absolute top-1/2 -translate-y-1/2 left-2 text-zinc-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex items-center gap-5 lg:hidden">
                <button
                  type="button"
                  class="hidden h-6 w-6 items-center justify-center rounded-md transition hover:bg-white/5"
                  aria-label="Toggle navigation"
                >
                  <svg
                    viewBox="0 0 10 9"
                    fill="none"
                    stroke-linecap="round"
                    aria-hidden="true"
                    class="w-2.5 stroke-white"
                  >
                    <path d="M.5 1h9M.5 8h9M.5 4.5h9"></path>
                  </svg></button
                ><a
                  aria-label="Home"
                  href="/"
                  class="h-6 text-white font-black text-xl"
                  >Loot Creator</a
                >
              </div>
              <div
                class="ml-auto flex items-center gap-x-2 relative window-non-draggable"
              >
                <button
                  class="text-zinc-300 rounded-lg bg-zinc-500/10 px-2 py-1.5 transition hover:bg-zinc-400/20 hover:text-white"
                  @click="minimizeApp"
                >
                  <MinusIcon class="size-5" />
                </button>
                <button
                  class="hidden text-zinc-300 rounded-lg bg-zinc-500/10 px-2 py-1.5 transition hover:bg-zinc-400/20 hover:text-white"
                  @click="maximizeApp"
                >
                  <ViewfinderCircleIcon class="size-5" />
                </button>
                <button
                  class="text-zinc-300 rounded-lg bg-zinc-500/10 px-2 py-1.5 transition hover:bg-zinc-400/20 hover:text-white"
                  @click="closeApp"
                >
                  <XMarkIcon class="size-5" />
                </button>
              </div>
            </div>
            <nav class="hidden lg:mt-10 lg:block">
              <ul role="list">
                <li class="relative mt-6 md:mt-0">
                  <h2 class="text-xs font-semibold text-white">Tools</h2>
                  <div class="relative mt-3 pl-2">
                    <div
                      class="absolute inset-x-0 top-0 will-change-transform bg-white/2.5"
                      style="
                        height: 96px;
                        top: 0px;
                        opacity: 1;
                        border-radius: 8px;
                        transform: none;
                        transform-origin: 50% 50% 0px;
                      "
                    ></div>
                    <div
                      class="absolute inset-y-0 left-2 w-px bg-white/5"
                    ></div>
                    <div
                      class="absolute left-2 h-6 w-px bg-red-500"
                      :style="{
                        opacity: 1,
                        top: `${28 * activePageIndex}px`,
                      }"
                    ></div>
                    <ul role="list" class="border-l border-transparent">
                      <li class="relative">
                        <RouterLink
                          aria-current="page"
                          class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-white/50"
                          exact-active-class="!text-white"
                          to="/"
                          ><span class="truncate"
                            >Tibia Wiki Loot Creator</span
                          ></RouterLink
                        >
                      </li>
                      <li class="relative">
                        <RouterLink
                          class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-white/50"
                          exact-active-class="!text-white"
                          to="/items"
                          ><span class="truncate"
                            >Items mapping</span
                          ></RouterLink
                        >
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <router-view />
      </div>
    </div>
  </div>
</template>
