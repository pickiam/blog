import fetch from '../config/fetch.js';
import env from '../config/env.js'

export const login = (params) => fetch({
    url: env.baseUrl + '/admin/login',
    method: 'POST',
    data: params
});

export const artList = params => fetch({
    url: env.baseUrl +'/article/artList',
    method: 'GET',
    data: params
});

export const getTagsList = params => fetch({
    url: env.baseUrl + '/tags/getTagsList',
    method: 'GET',
    data: params
});

export const addTag = (AUTH_TOKEN, params) => fetch({
    url: env.baseUrl + '/tags/addTag',
    method: 'POST',
    data: params,
    headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN }
});

export const deleteTag = params => fetch({
    url: env.baseUrl + '/tags/deleteTag/' + params,
    method: 'DELETE'
});

export const updateTag = params => fetch({
    url: env.baseUrl + '/tags/updateTag/' + params.tagId,
    method: 'PUT',
    data: params
});

export const getArtList = params => fetch({
    url: env.baseUrl + '/article/artList',
    method: 'GET',
    data: params
});

export const getArtDetails = params => fetch({
    url: env.baseUrl + '/article/artDetail/' + params,
    method: 'get'
});

export const addArticle = params => fetch({
    url: env.baseUrl + '/article/addArticle',
    method: 'POST',
    data: params,
    headers: { 'Authorization': 'Bearer ' + 'sfdfasdfasdf'}

});