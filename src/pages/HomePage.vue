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
                >Loot Creator
              </a>
            </div>
            <div
              class="window-draggable fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 backdrop-blur bg-zinc-900/[var(--bg-opacity-dark)]"
              style="--bg-opacity-light: 0.5; --bg-opacity-dark: 0.2"
            >
              <div
                class="absolute inset-x-0 top-full h-px transition bg-white/10"
              ></div>
              <div class="hidden lg:block lg:max-w-md lg:flex-auto">
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
            </div>
            <nav class="hidden lg:mt-10 lg:block">
              <ul role="list">
                <li class="md:hidden">
                  <a
                    class="block py-1 text-sm transition text-zinc-400 hover:text-white"
                    href="/"
                    >API</a
                  >
                </li>
                <li class="md:hidden">
                  <a
                    class="block py-1 text-sm transition text-zinc-400 hover:text-white"
                    href="#"
                    >Documentation</a
                  >
                </li>
                <li class="md:hidden">
                  <a
                    class="block py-1 text-sm transition text-zinc-400 hover:text-white"
                    href="#"
                    >Support</a
                  >
                </li>
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
                      style="top: 4px; opacity: 1"
                    ></div>
                    <ul role="list" class="border-l border-transparent">
                      <li class="relative">
                        <a
                          aria-current="page"
                          class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-white"
                          href="/"
                          ><span class="truncate"
                            >Tibia Wiki Loot Creator</span
                          ></a
                        >
                      </li>
                      <li class="relative">
                        <span
                          class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-400 hover:text-white"
                          href="#"
                          ><span class="truncate">More soon...</span></span
                        >
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <div class="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main class="flex-auto">
            <article class="flex h-full flex-col pb-10 pt-16">
              <div
                class="flex-auto prose prose-invert !max-w-5xl [html_:where(&amp;>*)]:mx-auto [html_:where(&amp;>*)]:max-w-2xl [html_:where(&amp;>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&amp;>*)]:lg:max-w-3xl"
              >
                <div
                  class="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden"
                >
                  <div
                    class="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] [mask-image:linear-gradient(white,transparent)]"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-red-500/30 to-indigo-600/30 opacity-100"
                    >
                      <svg
                        aria-hidden="true"
                        class="absolute inset-x-0 inset-y-[-40%] h-[200%] w-full skew-y-[-8deg] mix-blend-overlay fill-white/5 stroke-white/5"
                      >
                        <defs>
                          <pattern
                            id=":S1:"
                            width="72"
                            height="56"
                            patternUnits="userSpaceOnUse"
                            x="-12"
                            y="4"
                          >
                            <path d="M.5 56V.5H72" fill="none"></path>
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          stroke-width="0"
                          fill="url(#:S1:)"
                        ></rect>
                        <svg x="-12" y="4" class="overflow-visible">
                          <rect
                            stroke-width="0"
                            width="73"
                            height="57"
                            x="288"
                            y="168"
                          ></rect>
                          <rect
                            stroke-width="0"
                            width="73"
                            height="57"
                            x="144"
                            y="56"
                          ></rect>
                          <rect
                            stroke-width="0"
                            width="73"
                            height="57"
                            x="504"
                            y="168"
                          ></rect>
                          <rect
                            stroke-width="0"
                            width="73"
                            height="57"
                            x="720"
                            y="336"
                          ></rect>
                        </svg>
                      </svg>
                    </div>
                    <svg
                      viewBox="0 0 1113 440"
                      aria-hidden="true"
                      class="absolute left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px] hidden"
                    >
                      <path
                        d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <h1>Generate loot</h1>
                <p class="lead">
                  Use fields below to enter monster name, and generate loot from
                  Tibia Fandom Wiki
                </p>
                <WebScrape class="not-prose" />
              </div>
            </article>
          </main>
          <footer class="w-full space-y-10 pb-16 lg:max-w-5xl">
            <div
              class="flex flex-col items-center justify-between gap-5 border-t border-zinc-900/5 pt-8 sm:flex-row dark:border-white/5"
            >
              <p class="text-xs text-zinc-600 dark:text-zinc-400">
                © Copyright
                <!-- -->2024<!-- -->. All rights reserved.
              </p>
              <div class="flex gap-4">
                <a
                  class="group"
                  href="https://github.com/rafalolszewski94/loot-mob-creator"
                  ><span class="sr-only">Follow us on GitHub</span
                  ><svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    class="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
                    ></path></svg
                ></a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WebScrape from "../components/WebScrape.vue";
</script>
