import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'
//use the user namespace; i.e. user.state
import * as user from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    //using ES2015 argument destructuring to pull out { perPage, page } .
    //This is because the second argument with both mutations and actions is effectively a payload.
    //The payload in both Actions and Mutations can be a single variable or a single object.
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('Something went wrong:', error.message)
        })
    },
    //notice how we pass getters here
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('Something went wrong:', error.message)
          })
      }
    }
  },
  getters: {
    // You can pass one getter to another such as `getEventById: (state, getters) => { return getters.otherFunction }`
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
