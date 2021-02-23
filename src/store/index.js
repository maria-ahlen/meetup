import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: "https://api.jsonbin.io/v3/b/6034df83f1be644b0a639a69",
    apiKey: "$2b$10$DQabN5NhCvGHt9M5C5daz.GVexA/izze7N4i2qBeHNFyCa7lnWTmC", 
    events: Array,
    show: {
      showMenu: false,
      showWelcome: false
    },
    filteredEvents: Array,
    filter: ''
  },

  mutations: {
    displayEvents(state, data) {
      state.events = data
    },

    displayFilterSearch(state, data) {
      state.filteredEvents = data
    },

    toggleMenu(state) {
      state.show.showMenu = !state.show.showMenu
    },

    showWelcome(state) {
      state.show.showWelcome = !state.show.showWelcome
    }
  },

  actions: {
    async fetchEventsFromBackend(ctx) {
      let options = {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": ctx.state.apiKey,
          "X-Bin-Versioning": "false"
        }
      }
      let data = await ax.get(`${ctx.state.apiUrl}`, options)
      ctx.commit('displayEvents', data.data.record.events)
    },

    async postCommentToBackend(ctx,) {
      let options = {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": ctx.state.apiKey,
          "X-Bin-Versioning": "false"
        }
      }

      try {
        let data = await ax.put(`${ctx.state.apiUrl}`, {
          events: ctx.state.events,
        }, 
        options)
        ctx.commit('displayEvents', data.data.record.events)
      } catch (error) {
        console.log('error: ', error)
      }
    },

    async filterSearch(ctx, search) {
      await ctx.commit('setFilterSearch', search)
      ctx.dispatch('searchFilter')
    }
  },

  modules: {
  }
})
