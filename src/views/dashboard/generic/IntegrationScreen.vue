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
    <IntegrationDialog :close-dialog="closeDialog" />
  </TransitionRoot>

  <TransitionRoot appear :show="runDialogVisible" as="template">
    <ProcessDialog :title="title" :current-tenant="currentTenant" :close-dialog="closeRunDialog" />
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
      <IntegrationTable :open-run-dialog="openRunDialog" />
    </div>
  </div>
</template>

<script>
import userList from '@/data/users/userList.json'
import IntegrationTable from './IntegrationTable.vue'
import IntegrationDialog from './IntegrationDialog.vue'
import ProcessDialog from './ProcessDialog.vue'
import { TransitionRoot } from '@headlessui/vue'
import { ref } from 'vue'
import axios from 'axios'

export default {
  components: {
    IntegrationDialog,
    TransitionRoot,
    IntegrationTable,
    ProcessDialog,
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
      // currentTenant: null,
      currentTenant: {
        TenantID: 'TBSE',
        TenantURL: 'tbse',
        TenantName: 'TampaBay',
      },
      currPropertyName: 'AccountConfig',
      currPropertyValue: null,
      selectedProperties: [],
      tenantList: [],
      propertyList: ['AccountConfig', 'AuthenticationConfig'],
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
    openRunDialog: function () {
      this.runDialogVisible = true
    },
    closeRunDialog: function () {
      this.runDialogVisible = false
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
          console.log(this.tenantList)
        })
        .catch(() => {})
        .finally(() => {
          // this.currentTenant = this.tenantList.length ? this.tenantList[0].TenantID : null
          this.fetchingTenants = false
          this.fetchTenantDataSources()
        })
    },
    addProperty: function () {
      console.log(this.currPropertyName)
      console.log(this.currPropertyValue)
      const existentProp = this.selectedProperties.findIndex((obj) => obj.PropertyName === this.currPropertyName)
      console.log(existentProp)
      if (existentProp === -1) {
        this.selectedProperties.push({
          PropertyName: this.currPropertyName,
          PropertyValue: this.currPropertyValue,
        })
      } else {
        alert('PICK ANOTHTER PROPERTY!')
      }
    },
    onTenantSelectChange(event) {
      this.currentTenant = event.target.value
      this.fetchTenantDataSources()
    },
    fetchTenantDataSources() {
      this.fetchingDataSources = true
      const url = `https://death-to-retool.azurewebsites.net/api/datasources/${this.currentTenant}`
      console.log(url)
      axios
        .get(url)
        .then((result) => {
          console.log(result.data)
          this.tenantDataSources = result.data
          console.log(this.tenantDataSources)
        })
        .catch(() => {})
        .finally(() => {
          this.fetchingDataSources = false
        })
    },
  },
}
</script>
