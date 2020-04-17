import EventService from '@/services/EventService.js'

//all mutations, actions and getters will be namespaced under `event`
export const namespaced = true

export const state = {
  events: [],
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, rootState }, event) {
    //use rootState to access state in other modules
    console.log('User creating Event is ' + rootState.user.user.name)

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
}

export const getters = {
  // You can pass one getter to another such as `getEventById: (state, getters) => { return getters.otherFunction }`
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
