import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
    state:{
        currentShow : null,
        stagesSent: false,
        calculatedOutcomes: null,
        shows: false
    },
    getters:{
        currentShow: state => state.currentShow,
        stagesSent: state => state.stagesSent, 
        calculatedOutcomes: state => state.calculatedOutcomes,
        shows: state => state.shows
    },
    mutations:{
        setCurrentShow(state, payload){
            state.currentShow = payload;
        },
        setStagesSent(state, payload){
            state.stagesSent = payload;
        },
        setCalculatedOutcomes(state, payload){
            state.calculatedOutcomes = payload;
        },
        setShows(state, payload) {
            state.shows = payload;
        }
    },
    actions:{
        fetchCurrentShow: {
            root: true,
            handler({commit}, payload){
                axios
                .post('http://localhost:3000/api/insert-show', payload)
                .then(r => r.data)
                .then(
                    res => {
                        commit('setCurrentShow', res.details) 
                    }
                )
            }
        },
        sendStages: {
            root: true,
            handler({commit}, payload){
                axios
                .post(`http://localhost:3000/api/${payload.id}/insert-stage`, payload)
                .then(r => r.data)
                .then(
                    res => {
                        console.log(res);
                        commit('setStagesSent', true) 
                    }
                )
            }        
        },
        calculateOutcomes: {
            root: true,
            handler({commit}, id){
                axios
                .get(`http://localhost:3000/api/${id}/stages/calculateOutcomes`)
                .then(r => r.data)
                .then(
                    res => {
                        commit('setCalculatedOutcomes', res.details) 
                    }
                )
            }
        },
        fetchShows: {
            root: true,
            handler({commit}){
                axios
                .get(`http://localhost:3000/api/shows/getAll`)
                .then(r => r.data)
                .then(
                    res => {
                        commit('setShows', res.details) 
                    }
                )  
            }
        }
    }
})