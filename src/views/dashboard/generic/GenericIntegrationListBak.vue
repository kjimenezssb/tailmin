<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">{{ title }}</h2>

    <div class="flex items-center space-x-1 text-xs">
      <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Tenants</span>
    </div>
  </div>

  <TransitionRoot appear :show="dialogVisible" as="template">
    <Dialog as="div" @close="closeModal">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                w-full
                max-w-md
                p-6
                my-8
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-2xl
              "
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Create new NOT STITCH integration
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Please select the tenant and data source you want to configure</p>
              </div>

              <div class="mt-2">
                <label class="block mt-4">
                  <span class="text-gray-700">Pick a Tenant</span>
                  <select
                    v-model="currentTenant"
                    class="form-select mt-1 block w-full"
                    @change="onTenantSelectChange($event)"
                  >
                    <option v-for="(opt, index) in tenantList" :key="index" :value="opt">
                      {{ opt.TenantName }}
                    </option>
                  </select>
                </label>

                <label class="block mt-4">
                  <span class="text-gray-700">Pick Tenant Data Source</span>
                  <select class="form-select mt-1 block w-full" @change="onTenantDataSourceSelectChange($event)">
                    <option v-for="(opt, index) in tenantDataSources" :key="index" :value="opt.TenantDataSourceID">
                      {{ opt.FriendlyName }}
                    </option>
                  </select>
                </label>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="
                    inline-flex
                    justify-center
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-blue-900
                    bg-blue-100
                    border border-transparent
                    rounded-md
                    hover:bg-blue-200
                    focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
                  "
                  @click="openRunDialog"
                >
                  Continue
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot appear :show="runDialogVisible" as="template">
    <Dialog as="div" @close="closeModal">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                w-full
                max-w-md
                p-6
                my-8
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-2xl
              "
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"> RUN </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Please select parameters.</p>
              </div>

              <div class="mt-2">
                <label class="block mt-4">
                  <span class="text-gray-700">Tenant Url: </span>
                  {{ currentTenant.TenantUrl }}
                </label>
                <label class="block mt-4">
                  <span class="text-gray-700">Type: </span>
                  {{ title }}
                </label>

                <label class="block mt-4">
                  <span class="text-gray-700">Enviroment</span>
                  <select Id="Enviroment" v-model="Enviroment" class="form-select mt-1 block w-full">
                    <option value="dev">Dev</option>
                    <option value="test">Test</option>
                    <option value="production">Production</option>
                  </select>
                </label>

                <label class="block mt-4">
                  <span class="text-gray-700">Stream To Execute</span>
                  <select Id="StreamToExecute" v-model="StreamToExecute" class="form-select mt-1 block w-full">
                    <option value="Stream1">Stream 1</option>
                    <option value="Stream2">Stream 2</option>
                    <option value="Stream3">Stream 3</option>
                  </select>
                </label>

                <label class="block mt-4">
                  <span class="text-gray-700">Mode</span>
                  <select id="Mode" v-model="Mode" class="form-select mt-1 block w-full">
                    <option value="daily">Daily</option>
                    <option value="missing">Missing</option>
                    <option value="backfill">Backfill</option>
                  </select>
                </label>
                <label class="block mt-4">
                  <span class="text-gray-700">Notifications</span>
                  <select id="Notifications" v-model="Notifications" class="form-select mt-1 block w-full">
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </label>
                <label class="block mt-4">
                  <span class="text-gray-700">Multithreaded</span>
                  <select id="Multithreaded" v-model="Multithreaded" class="form-select mt-1 block w-full">
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </label>

                <label class="block mt-4">
                  <span class="text-gray-700">Accounts</span>
                  <select id="Accounts" v-model="Accounts" class="form-select mt-1 block w-full">
                    <option value="Account1">Account 1</option>
                    <option value="Account2">Account 2</option>
                    <option value="Account3">Account 3</option>
                  </select>
                </label>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="
                    inline-flex
                    justify-center
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-blue-900
                    bg-blue-100
                    border border-transparent
                    rounded-md
                    hover:bg-blue-200
                    focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
                  "
                  @click="closeDialog"
                >
                  Submit
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <div class="p-4 mt-8 sm:px-8 sm:py-4">
    <div class="p-4 bg-white rounded">
      <div class="flex justify-between">
        <div>
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              id="search"
              name="search"
              type="search"
              class="
                w-full
                py-2
                text-sm text-gray-900
                rounded-md
                pl-10
                border border-gray-300
                focus:outline-none focus:ring-gray-500 focus:ring-gray-500 focus:z-10
              "
              placeholder="Search Tenant"
            />
          </div>
        </div>
        <div>
          <div>
            <button
              class="flex items-center bg-green-500 p-2 text-white rounded text-sm hover:bg-green-600"
              @click="openDialog()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>

              Create New
            </button>
          </div>
        </div>
      </div>
      <table class="w-full mt-2 text-gray-500">
        <thead class="border-b">
          <tr>
            <th class="p-2 text-left text-gray-600">
              <input
                v-model="selectAll"
                type="checkbox"
                class="h-5 w-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0"
              />
            </th>
            <th class="text-left text-gray-600">TENANT</th>
            <th class="text-left text-gray-600">DESCRIPTION</th>
            <th class="text-left text-gray-600">STATUS</th>
            <th class="text-left text-gray-600">LAST ACTIVITY</th>
            <th class="text-left text-gray-600">DATE</th>
            <th class="text-right text-gray-600">ACTIONS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="user in userList" :key="user.id">
            <td class="p-2">
              <input
                type="checkbox"
                class="h-5 w-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0"
                :checked="selectAll"
              />
            </td>
            <td class="flex items-center py-4">
              <!-- <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" :src="user.avatar" alt="" /> -->
              <div class="px-4">
                <div>
                  <a href="#" class="text-gray-600 font-bolder">{{ user.name }}</a>
                </div>
                <!-- <div class="font-bold text-sm">
                  {{ user.email }}
                </div> -->
              </div>
            </td>
            <td>{{ user.role }}</td>
            <td>
              <span v-if="user.isActive" class="px-2 py-1 rounded text-xs text-white bg-green-500">Active</span>
              <span v-else class="px-2 py-1 rounded text-xs text-white bg-red-500">Suspended</span>
            </td>
            <td>{{ user.lastActivity }}</td>
            <td>{{ user.joinDate }}</td>
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
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Run
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
        <tfoot>
          <tr>
            <td colspan="7" class="py-2">
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-500">
                    Showing
                    <span class="font-medium">1</span>
                    to
                    <span class="font-medium">5</span>
                    of
                    <span class="font-medium">42</span>
                    results
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                      href="#"
                      class="
                        relative
                        inline-flex
                        items-center
                        px-2
                        rounded-l-md
                        border border-gray-300
                        text-sm
                        font-medium
                        text-gray-500
                        hover:bg-gray-50
                      "
                    >
                      <span class="sr-only">Previous</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </a>
                    <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                    <a
                      href="#"
                      aria-current="page"
                      class="
                        z-10
                        bg-indigo-50
                        border-indigo-500
                        text-indigo-600
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-1
                        border
                        text-sm
                        font-medium
                      "
                    >
                      1
                    </a>
                    <a
                      href="#"
                      class="
                        border-gray-300
                        text-gray-500
                        hover:bg-gray-50
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-1
                        border
                        text-sm
                        font-medium
                      "
                    >
                      2
                    </a>
                    <a
                      href="#"
                      class="
                        border-gray-300
                        text-gray-500
                        hover:bg-gray-50
                        hidden
                        md:inline-flex
                        relative
                        items-center
                        px-4
                        py-1
                        border
                        text-sm
                        font-medium
                      "
                    >
                      3
                    </a>
                    <span
                      class="
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-1
                        border border-gray-300
                        text-sm
                        font-medium
                        text-gray-700
                      "
                    >
                      ...
                    </span>
                    <a
                      href="#"
                      class="
                        border-gray-300
                        text-gray-500
                        hover:bg-gray-50
                        hidden
                        md:inline-flex
                        relative
                        items-center
                        px-4
                        py-1
                        border
                        text-sm
                        font-medium
                      "
                    >
                      8
                    </a>
                    <a
                      href="#"
                      class="
                        border-gray-300
                        text-gray-500
                        hover:bg-gray-50
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-1
                        border
                        text-sm
                        font-medium
                      "
                    >
                      9
                    </a>
                    <a
                      href="#"
                      class="
                        border-gray-300
                        text-gray-500
                        hover:bg-gray-50
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-1
                        border
                        text-sm
                        font-medium
                      "
                    >
                      10
                    </a>
                    <a
                      href="#"
                      class="
                        relative
                        inline-flex
                        items-center
                        px-2
                        py-1
                        rounded-r-md
                        border border-gray-300
                        text-sm
                        font-medium
                        text-gray-500
                        hover:bg-gray-50
                      "
                    >
                      <span class="sr-only">Next</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import userList from '@/data/users/userList.json'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'
import { ref } from 'vue'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  setup() {
    const selectAll = ref(false)
    return {
      userList,
      selectAll,
    }
  },
  data() {
    return {
      dialogVisible: false,
      runDialogVisible: false,
      fetchingTenants: false,
      currentTenant: null,
      currentTenantDataSource: null,
      tenantList: [],
      entities: [],
      fetchingDataSources: false,
      tenantDataSources: [],
      Enviroment: null,
      StreamToExecute: null,
      Mode: null,
      Notifications: false,
      Multithreaded: false,
      Accounts: null,
    }
  },
  mounted: function () {
    console.log('JUST MOUNTED COMPONENT')
    this.fetchData()
  },
  methods: {
    openDialog: function () {
      this.dialogVisible = true
    },
    openRunDialog: function () {
      this.dialogVisible = false
      this.runDialogVisible = true
    },
    closeDialog: function () {
      console.log('TenantUrl: ' + this.currentTenant.TenantUrl)
      console.log('title: ' + this.title)
      console.log('Enviroment: ' + this.Enviroment)
      console.log('StreamToExecute: ' + this.StreamToExecute)
      console.log('Mode: ' + this.Mode)
      console.log('Notifications: ' + this.Notifications)
      console.log('Multithreaded: ' + this.Multithreaded)
      console.log('Mode: ' + this.Mode)
      console.log('Accounts: ' + this.Accounts)

      this.dialogVisible = false
      this.runDialogVisible = false
    },
    handleIntegrationCreation: function () {
      console.log('Should create the integration')
    },
  },
}
</script>
