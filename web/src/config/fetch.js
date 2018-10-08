import axios from 'axios';
// axios.interceptors.request.use((config) => {
//     if (this.$store.state.perInfo) {
//         config.headers.Authorization = this.$store.state.perInfo
//     }
//     return config;
// }, err => {
//     return Promise.reject(err);
// });
export default async (options) => {
    // options.type = options.type.toLowerCase();
    // options.url = env.baseUrl + options.url;
    // if ((options.type === 'get' || options.type === 'delete') && options.data) {
    //     let dataStr = '';
    //     if (Array.isArray(options.data)) {
    //         options.data.map(item => {
    //             Object.keys(item).forEach(v => {
    //                 dataStr += v + '=' + item[v] + '&';
    //             });
    //         });
    //     } else if (Object.prototype.toString.call(options.data) === '[object Object]') {
    //         Object.keys(options.data).forEach(k => {
    //             dataStr += k + '=' + options.data[k] + '&';
    //         });
    //         // 处理qs转义过的
    //     } else {
    //         dataStr += options.data;
    //         dataStr += '&';
    //     }
    //     // console.log(dataStr);
    //     if (dataStr !== '') {
    //         options.url = (options.url.indexOf('?') >= 0 ? options.url + '&' : options.url + '?') + dataStr.substr(0, dataStr.lastIndexOf('&'));
    //     }
    // }
    // let pramas = null;
    // if (options.type === 'post' || options.type === 'put') {
    //     pramas = options.data;
    // };
    // try {
    //     let response = await axios[options.type](options.url, options.headers, pramas);
    //     return response;
        
    // } catch (error) {
    //     throw new Error(error);
    // }
    // try {
    //     let response = await axios(options);
    //     return response;
    // } catch (error) {
    //     console.log(error)
    // }
    if (options.data && options.method.toLowerCase() === 'get' || options.method.toLowerCase() === 'delete') {
        let dataStr = '';
        Object.keys(options.data).forEach(k => {
            dataStr += k + '=' + options.data[k] + '&';
        })
        if (dataStr !== '') {
            options.url = (options.url.indexOf('?') >= 0 ? options.url + '&' : options.url + '?') + dataStr.substr(0, dataStr.lastIndexOf('&'));
        }
    }
    // console.log(options)
    let response = await axios(options);
    return response;
};
