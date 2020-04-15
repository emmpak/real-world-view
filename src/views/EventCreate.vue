<template>
  <div>
    <h1>Create Event {{ user.name }}</h1>
    <p>This event is created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  // mapState/mapGetters returns an object of computed properties
  // You can use object spread operator to add additional local computed properties (...)
  computed: {
    ...mapGetters(['catLength']),
    ...mapState(['user', 'categories'])
  }
}
</script>
