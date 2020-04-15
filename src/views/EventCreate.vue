<template>
  <div>
    <h1>Create Event {{ userName }}</h1>
    <p>This event is created by {{ userName }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    userName: state => state.user.name,
    userID: state => state.user.id,
    // can use quotes instead of dot notation for top-level state properties
    categories: 'categories'
  })
}
</script>
