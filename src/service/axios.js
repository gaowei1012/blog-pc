
import axios from 'axios';

const baseURL = 'http://localhost:3000';
const option = {
    baseURL,
    timeout: 8000,
    withCredentials:true
}
/**
 * get请求
 */
export function get(url) {
    return axios({
        ...option,
        method: 'GET',
        url
    }).then(res => res.data)
}

/**
 * post 请求
 */
export function post(url, data) {
    return axios({
        ...option,
        method: 'POST',
        url,
        data
    }).then(res => res.data)
}

/**
 *  put 请求
 * @param {string} url 
 * @param {object} data 
 */
export function put(url, data) {
    return axios({
        ...option,
        method: 'PUT',
        url,
        data
    }).then(res => res.data)
}

/**
 * del 请求
 * @param {string} url 
 * @param {object} data 
 */
export function del(url, data) {
    return axios({
        ...option,
        method: 'DELETE',
        url,
        data,
    }).then(res => res.data)
}