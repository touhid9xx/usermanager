import axios from 'axios';

function initialState() {
    const users = [];
    const user = {};
    const pagination = {};
    const addUserErrors = [];
    const updateUserErrors = [];
    const usersLoader = false;

    return {
        users,
        user,
        pagination,
        addUserErrors,
        updateUserErrors,
        usersLoader
    }
}

const getters = {
    users(state){
        return state.users
    },
    user(state){
        return state.user
    },
    pagination(state){
        return state.pagination
    },
    addUserErrors(state){
        return state.addUserErrors
    },
    updateUserErrors(state){
        return state.updateUserErrors
    },
    usersLoader(state) {
        return state.usersLoader
    }

}

const actions = {
    async getAllUsers(ctx, {page=1, searchField = ''}) {
        return new Promise((resolve,reject) => {
            ctx.commit('setUsersLoader', false);
            axios({
                url: '/admin/users?page=' +page+'&search=' +searchField,
                method:'GET'
            })
                .then((response) => {
                    ctx.commit('setUsersLoader', false);
                    ctx.commit('setUsers', response.data.users.data);
                    ctx.commit('setPagination', response.data.users);
                    resolve(response)
                })
                .catch((error) =>{
                    ctx.commit('setUsersLoader', false);
                    reject(error);
                });

        })
    },

    async getUser(ctx,id) {
        return new Promise((resolve,reject) => {
            ctx.commit('setUsersLoader', true);
            axios({
                url: '/admin/users/' +id,
                method: 'GET'
            })
                .then((response) => {
                    ctx.commit('setUsersLoader', false);
                    ctx.commit('setUser', response.data.user);

                    resolve(response);
                })
                .catch((error) =>{
                    ctx.commit('setUsersLoader', false);
                    reject(error);
                })
        })
    },

    async addNewUser(ctx, data) {
        return new Promise((resolve,reject) => {
            ctx.commit('setUsersLoader', true);
            axios({
                url: '/admin/users',
                method: 'POST',
                data: data
            }).then((response)=>{
                 ctx.commit('setUsersLoader', false);
                resolve(response)
            })
                .catch((error)=>{
                    ctx.commit('setUsersLoader', false);
                    ctx.commit("setAddUserErrors",error.response.data.errors)
                    reject(error);
                })

        })
    },

    async updateUser(ctx, {id,data}) {
        return new Promise((resolve,reject) =>{
            ctx.commit('setUsersLoader', true);
            axios({
                url: 'api/admin/users/' +id,
                method: 'PUT',
                data: data
            }).then((response) => {
                 ctx.commit('setUsersLoader', false);
                resolve(response)

            })
                .catch((error) => {
                    ctx.commit('setUsersLoader', false);
                    reject(error)
                })
        })
    },

    async deleteUser(ctx, id) {
        return new Promise((resolve,reject) =>{
            ctx.commit('setUsersLoader', true);
            axios({
                url: '/admin/users/' +id,
                method: 'PUT',

            }).then((response) => {
                 ctx.commit('setUsersLoader', false);
                resolve(response)

            })
                .catch((error) => {
                    ctx.commit('setUsersLoader', false);
                    reject(error)
                })
        })
    },



}

const mutations= {
    setUsers(state,users) {
        state.users = users
    },
    setUser(state,user) {
        state.user = user
    },
    setPagination(state,pagination) {
        state.pagination = pagination
    },
    setAddUserErrors(state,addUserErrors) {
        state.addUserErrors = addUserErrors
    },
    setUpdateUserErrors(state,updateUserErrors) {
        state.updateUserErrors = updateUserErrors
    },
    setUsersLoader(state,usersLoader) {
        state.usersLoader = usersLoader
    },
}

export  default {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions
}
