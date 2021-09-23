<template>
  <table class="w-full mt-2 text-gray-500">
    <thead class="border-b">
      <tr>
        <th class="text-left text-gray-600">TENANT</th>
        <th class="text-left text-gray-600">CREATED BY</th>
        <th class="text-left text-gray-600">CREATED AT</th>
        <th class="text-left text-gray-600">UPDATED BY</th>
        <th class="text-left text-gray-600">UPDATED AT</th>
        <th class="text-left text-gray-600">STATUS</th>
        <th class="text-right text-gray-600">ACTIONS</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr v-for="(row, index) in rows" :key="index">
        <td>{{ row.TenantName }}</td>
        <td>{{ row.CreatedBy }}</td>
        <td>{{ row.CreatedDate }}</td>
        <td>{{ row.UpdatedBy }}</td>
        <td>{{ row.UpdatedDate }}</td>
        <td>
          <span v-if="true" class="px-2 py-1 rounded text-xs text-white bg-green-500">Active</span>
          <!-- <span v-else class="px-2 py-1 rounded text-xs text-white bg-red-500">Suspended</span> -->
        </td>
        <td class="text-right">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="
                  inline-flex
                  justify-center
                  w-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  rounded-md
                  bg-gray-500
                  hover:bg-gray-600
                  focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                "
              >
                Actions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="
                  absolute
                  right-0
                  w-32
                  mt-1
                  origin-top-right
                  bg-white
                  divide-y divide-gray-100
                  rounded-md
                  shadow-lg
                  ring-1 ring-black ring-opacity-5
                  z-50
                  focus:outline-none
                "
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-green-400 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                      @click="openRunDialog"
                    >
                      Run
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </MenuItem>

                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-gray-400 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Edit
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-red-400 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  props: {
    openRunDialog: {
      type: Function,
      default: null,
      required: false,
    },
    title: {
      type: String,
      default: '',
      required: false,
    },
    rows: {
      type: Array,
      default: null,
      required: false,
    },
    integrationName: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  mounted: function () {
    console.log('JUST MOUNTED TABLE COMPONENT')
  },
}
</script>
