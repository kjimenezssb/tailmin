<template>
<div>

<GenericIntegrationList
  title = "Email Salesforce"/>

</div>

</template>

<script>
import userList from '@/data/users/userList.json'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ref } from 'vue'
import GenericIntegrationList from '@/views/dashboard/generic/GenericIntegrationList.vue'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    GenericIntegrationList,
  },

  setup() {
    const selectAll = ref(false)

    return {
      userList,
      selectAll,
    }
  },
}
</script>
