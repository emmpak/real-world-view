<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
    </template>
    <router-link :to="{ name: 'event-list', query: { page: page + 1 } }"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/index'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store.dispatch('event/fetchEvents', { page: currentPage }).then(() => {
    // pass the page as a prop; need to enable props in the router
    routeTo.params.page = currentPage
    next()
  })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  // for the first time the component is created
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  // all subsequent updates as the component is reused when pagination
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    // this is now refering to the modules namespaces
    // to access the state in those modules, use the dot notation (i.e. event.event)
    ...mapState(['event', 'user'])
  }
}
</script>
