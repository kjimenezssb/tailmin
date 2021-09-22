<template>
  <div>
    <GenericIntegrationList title="Email Emma" />
  </div>
</template>

<script>
import userList from '@/data/users/userList.json'
import { ref } from 'vue'
import GenericIntegrationList from '@/views/dashboard/generic/GenericIntegrationList.vue'

export default {
  components: {
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
