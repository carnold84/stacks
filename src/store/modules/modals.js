import { v4 as uuidv4 } from 'uuid';

export default {
  namespaced: true,
  state: {
    modals: {
      allIds: [],
      byId: {},
    },
  },
  getters: {
    getAll(state) {
      return state.modals.allIds.map((id) => {
        return state.modals.byId[id];
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
    add(state, modal) {
      state.modals.allIds.push(modal.id);
      state.modals.byId[modal.id] = modal;
    },
    remove(state, id) {
      state.modals.allIds.splice(state.modals.allIds.indexOf(id), 1);
      delete state.modals.byId[id];
    },
  },
};
