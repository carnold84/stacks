import { v4 as uuidv4 } from 'uuid';

export default {
  namespaced: true,
  state: {
    panels: {
      allIds: [],
      byId: {},
    },
  },
  getters: {
    getAll(state) {
      return state.panels.allIds.map((id) => {
        return state.panels.byId[id];
      });
    },
  },
  actions: {
    add({ commit }, payload) {
      commit('add', {
        id: uuidv4(),
        ...payload,
      });
    },
    remove({ commit }, payload) {
      commit('remove', payload);
    },
  },
  mutations: {
    add(state, panel) {
      state.panels.allIds.push(panel.id);
      state.panels.byId[panel.id] = panel;
    },
    remove(state, id) {
      state.panels.allIds.splice(state.panels.allIds.indexOf(id), 1);
      delete state.panels.byId[id];
    },
  },
};
