<template>
  <Dialog as="div" @close="closeModal">
    <DialogOverlay />
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
                <span class="text-gray-700">Pick a Tenant1</span>
                <select class="form-select mt-1 block w-full" @change="getDataSource($event)">
                  <option v-for="(opt, index) in tenantList" :value="opt.TenantID" :key="index">
                    {{ opt.TenantName }}
                  </option>
                </select>
              </label>

              <label class="block mt-4">
                <span class="text-gray-700">Pick Tenant Data Source</span>
                <select class="form-select mt-1 block w-full">
                  <option v-for="(opt, index) in tenantDataSources" :value="opt.TenantDataSourceID" :key="index">
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
                @click="closeDialog"
              >
                Got it, thanks!
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
import axios from 'axios'

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
      fetchingTenants: false,
      tenantList: [],
      entities: [],
      fetchingDataSources: false,
      tenantDataSources: [],
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
    closeDialog: function () {
      this.dialogVisible = false
    },
    handleIntegrationCreation: function () {
      console.log('Should create the integration')
    },
    fetchData: function () {
      this.fetchingTenants = true
      const url = 'https://death-to-retool.azurewebsites.net/api/tenants'
      console.log(url)
      axios
        .get(url)
        .then((result) => {
          console.log(result.data)
          this.tenantList = result.data
        })
        .catch(() => {
          console.log('ERROR')
        })
        .finally(() => {
          this.fetchingTenants = false
        })
    },
    getDataSource(event) {
      const TenantId = event.target.value
      this.fetchingDataSources = true
      const url = 'https://death-to-retool.azurewebsites.net/api/datasources/' + TenantId
      console.log(url)
      axios
        .get(url)
        .then((result) => {
          console.log(result.data)
          this.tenantDataSources = result.data
        })
        .catch(() => {
          console.log('ERROR')
        })
        .finally(() => {
          this.fetchingTenants = false
        })
    },
  },
}
</script>
