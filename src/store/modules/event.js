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
  createEvent({ commit, rootState, dispatch }, event) {
    //use rootState to access state in other modules
    console.log('User creating Event is ' + rootState.user.user.name)

    // note: return is needed so that other functions calling createEvent expect a promise?
    // otherwise, the error will be uncaught because this function wil return undefined before the error is raised (asynchronous)
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  //using ES2015 argument destructuring to pull out { perPage, page } .
  //This is because the second argument with both mutations and actions is effectively a payload.
  //The payload in both Actions and Mutations can be a single variable or a single object.
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  //notice how we pass getters here
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
          return response.data
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
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
