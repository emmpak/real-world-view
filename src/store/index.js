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
    }
  },
  actions: {},
  modules: {},
  getters: {
    // You can pass one getter to another such as `catLenth: (state, getters) => { return getters.otherFunction }`
    catLength: state => {
      return state.categories.length
    }
  }
})
