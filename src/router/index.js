import { createWebHistory, createRouter } from 'vue-router';

import Form from '../components/Form.vue';
import List from '../components/ListUsers.vue';

const routes = [
    { path: '/', name: 'Home', component: List },
    { path: '/form', name: 'Create', component: Form },
    { path: '/users', name: 'List', component: List },
];

const Router = createRouter({
    history: createWebHistory(),
    routes
})

export default Router