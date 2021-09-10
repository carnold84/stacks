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
  mutations: {},
  actions: {},
};
