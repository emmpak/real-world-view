import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: '123', name: 'Callan' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    // using ES2015 argument destructuring to pull out { perPage, page } .
    //This is because the second argument with both mutations and actions is effectively a payload.
    //The payload in both Actions and Mutations can be a single variable or a single object.
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('Something went wrond:', error.message)
        })
    }
  },
  modules: {},
  getters: {
    // You can pass one getter to another such as `catLenth: (state, getters) => { return getters.otherFunction }`
    catLength: state => {
      return state.categories.length
    }
  }
})
