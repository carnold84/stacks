import api from '@/api';

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
    async load({ commit }) {
      const series = await api.series.getAll();

      series.forEach((element) => {
        commit('add', element);
      });
    },
  },
  mutations: {
    add(state, series) {
      state.series.allIds.push(series.id);
      state.series.byId[series.id] = series;
    },
  },
};
