import fetch from '../config/fetch.js';

export const fetchTest = params => fetch({
    url: 'carAmount',
    type: 'GET',
    data: params
})