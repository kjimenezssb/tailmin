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
              max-w-xl
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
                <select v-model="currentDataSource" class="form-select mt-1 block w-full">
                  <option v-for="(opt, index) in tenantDataSources" :key="index" :value="opt.TenantDataSourceID">
                    {{ opt.FriendlyName }}
                  </option>
                </select>
              </label>
            </div>

            <div v-if="currentDataSource" class="mt-4">
              <div class="mt-4">
                <p class="text-md text-gray-500">Pick your Custom properties</p>
              </div>

              <div class="mt-2">
                <label class="block mt-4">
                  <span class="text-gray-700">Property name</span>
                  <select v-model="currPropertyName" class="form-select mt-1 block w-full">
                    <option v-for="(opt, index) in propertyList" :key="index" :value="opt">
                      {{ opt }}
                    </option>
                  </select>
                </label>

                <label class="block mt-4">
                  <span class="text-gray-700">Property value</span>
                  <input
                    id="search"
                    v-model="currPropertyValue"
                    name="search"
                    type="search"
                    class="
                      w-full
                      py-2
                      text-sm text-gray-900
                      rounded-md
                      border border-gray-300
                      focus:outline-none focus:ring-gray-500 focus:ring-gray-500 focus:z-10
                    "
                    placeholder="Enter your property value"
                  />
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
                  @click="addProperty"
                >
                  Add property
                </button>
              </div>

              <div v-if="selectedProperties.length > 0" class="mt-4">
                <table class="w-full mt-2 text-gray-500">
                  <thead class="border-b">
                    <tr>
                      <th class="text-left text-gray-600">Property Name</th>
                      <th class="text-left text-gray-600">Property Value</th>
                      <th class="text-left text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="(obj, index) in selectedProperties" :key="index">
                      <td>{{ obj.PropertyName }}</td>
                      <td>{{ obj.PropertyValue }}</td>
                      <td>
                        <div class="flex items-center p-2 text-white rounded text-sm">
                          <button class="text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button class="text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          <!-- <button @click="setIsOpen(false)">Deactivate</button>
                        <button @click="setIsOpen(false)">Cancel</button> -->
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue'
import axios from 'axios'

export default {
  components: {
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: {
    closeDialog: {
      type: Function,
      default: null,
      required: false,
    },
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      fetchingTenants: false,
      currentTenant: null,
      currentDataSource: null,
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
    handleIntegrationCreation: function () {
      console.log('Should create the integration')
    },
    openDialog: function () {
      this.dialogVisible = true
    },
    fetchData: async function () {
      this.fetchingTenants = true
      const url = 'https://death-to-retool.azurewebsites.net/api/tenants'
      console.log(url)
      try {
        const response = await axios.get(url)
        this.tenantList = response.data
        this.currentTenant = this.tenantList.length ? this.tenantList[0] : null
        this.fetchTenantDataSources()
        this.fetchingTenants = false
      } catch (error) {
        console.log(error)
      }
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
      console.log(event)
      this.currentDataSource = null
      this.tenantDataSources = []
      this.fetchTenantDataSources()
    },
    fetchTenantDataSources: async function () {
      this.fetchingDataSources = true
      console.log(this.currentTenant)
      const url = `https://death-to-retool.azurewebsites.net/api/datasources/${this.currentTenant.TenantID}`
      console.log(url)
      try {
        const response = await axios.get(url)
        this.tenantDataSources = response.data
        this.fetchingDataSources = false
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
