import axios from 'axios';
import baseUrl from './env.js'
export default async (options) => {
    options.type = options.type.toLowerCase();
    options.url = baseUrl + options.url;
    if ((options.type === 'get' || options.type === 'delete') && options.data) {
        let dataStr = '';
        if (Array.isArray(options.data)) {
            options.data.map(item => {
                Object.keys(item).forEach(v => {
                    dataStr += v + '=' + item[v] + '&';
                });
            });
        } else if (Object.prototype.toString.call(options.data) === '[object Object]') {
            Object.keys(options.data).forEach(k => {
                dataStr += k + '=' + options.data[k] + '&';
            });
            // 处理qs转义过的
        } else {
            dataStr += options.data;
            dataStr += '&';
        }
        // console.log(dataStr);
        if (dataStr !== '') {
            options.url = (options.url.indexOf('?') >= 0 ? options.url + '&' : options.url + '?') + dataStr.substr(0, dataStr.lastIndexOf('&'));
        }
    }
    let pramas = null;
    if (options.type === 'post') {
        pramas = options.data;
    };
    try {
        let response = await axios[options.type](options.url, pramas);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};