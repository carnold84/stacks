export default {
  namespaced: true,
  state: {
    series: {
      allIds: ['series-1', 'series-2', 'series-3'],
      byId: {
        'series-1': {
          id: 'series-1',
          title: 'The Expanse',
        },
        'series-2': {
          id: 'series-2',
          title: 'Commonwealth Saga',
        },
        'series-3': {
          id: 'series-3',
          title: 'Villains',
        },
      },
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
