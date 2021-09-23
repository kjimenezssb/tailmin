<template>
  <Dialog as="div" @close="closeDialog">
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
                <!-- {{ TenantUrl }} -->
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
                  text-gray-900
                  bg-gray-100
                  border border-transparent
                  rounded-md
                  hover:bg-gray-200
                  focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500
                "
                @click="closeDialog"
              >
                Cancel
              </button>
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
                @click="submitData"
              >
                Submit
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</template>

<script>
import userList from '@/data/users/userList.json'
import { TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue'
import { ref } from 'vue'
// import axios from 'axios'

export default {
  components: {
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    // currentTenant: {
    //   type: Object,
    //   default: null,
    //   required: true,
    // },
    closeDialog: {
      type: Function,
      default: null,
      required: true,
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
    console.log('JUST MOUNTED PROCESS DIALOG COMPONENT')
    // this.fetchData()
  },
  methods: {
    submitData: function () {
      console.log('SUBMITTING DATA')
    },
    handleIntegrationCreation: function () {
      console.log('Should create the integration')
    },
  },
}
</script>
