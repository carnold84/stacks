//import api from '@/api';

export default {
  namespaced: true,
  state: {
    series: {
      allIds: [],
      byId: {},
    },
  },
  getters: {
    getAll(state) {
      return state.series.allIds.map((id) => {
        return state.series.byId[id];
      });
    },
    getById: (state) => (id) => {
      return state.series.byId[id];
    },
  },
  actions: {
    create({ commit }, author) {
      commit('add', author);
    },
  },
  mutations: {
    add(state, series) {
      if (!state.series.allIds.includes(series.id)) {
        state.series.allIds.push(series.id);
        state.series.byId[series.id] = series;
      }
    },
  },
};
