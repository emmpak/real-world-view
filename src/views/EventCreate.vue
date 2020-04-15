<template>
  <div>
    <h1>Create Event {{ user.name }}</h1>
    <p>This event is created by {{ user.id }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // mapState returns an object of computed properties
  // You can use object spread operator to add additional local computed properties (...)
  computed: mapState(['user', 'categories'])
}
</script>
