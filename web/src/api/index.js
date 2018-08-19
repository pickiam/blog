import fetch from '../config/fetch.js';

export const login = params => fetch({
    url: '/admin/login',
    type: 'POST',
    data: params
})