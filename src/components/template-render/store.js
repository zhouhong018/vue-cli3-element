const defultParam = {
    page: 1,
    size: 5
};

const state = {
    param: {
        page: 1,
        size: 5
    }
};

const mutations = {
    setParam(state, obj) {
        Object.assign(state.param, obj);
    },
    resetParam(state) {
        state.param = Object.assign({}, defultParam);
    }
};

export default {
    state,
    mutations
}