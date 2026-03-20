import {createStore} from 'vuex';

export default createStore({
    state: {
        dataToVisualize: null,
        treeName: null,
        visualizerSettings: {
            visMod: "circular",
            displayNodeLabels: true,
            displayBranches: true,
            displayBranchesLabels: true,
        },
        settingsOptions: {
            basics: [
                {
                    label: "Visualization Mode:",
                    param: "visMod",
                    options: [
                        {
                            text: 'Circular',
                            value: 'circular'
                        },
                        {
                            text: 'Rectangle',
                            value: 'rect'
                        },
                    ]
                },
                {
                    label: "Display Node Labels ?",
                    param: "displayNodeLabels",
                    options: [
                        {
                            text: 'yes',
                            value: true
                        },
                        {
                            text: 'No',
                            value: false
                        },
                    ]
                },
                {
                    label: "Display Branches ?",
                    param: "displayBranches",
                    options: [
                        {
                            text: 'yes',
                            value: true
                        },
                        {
                            text: 'No',
                            value: false
                        },
                    ]
                },
                {
                    label: "Display Branches Labels ?",
                    param: "displayBranchesLabels",
                    options: [
                        {
                            text: 'yes',
                            value: true
                        },
                        {
                            text: 'No',
                            value: false
                        },
                    ]
                },
            ]
        }
    },
    mutations: {
        setDataTooVisualize(state, val) {
            state.dataToVisualize = val.json;
            state.treeName = val.name;
        }
    },
    actions: {
        incrementAsync({commit}) {
            setTimeout(() => {
                commit('increment');
            }, 1000);
        }
    },
    getters: {
        getCount: state => state.count
    }
});
