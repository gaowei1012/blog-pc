import { get, post, put, del } from './axios';

/**
 * 注册
 * @param {object} data 
 */
function signup(data) {
    return post('/api/users/signup', data)
}

/**
 * 登录
 * @param {object} data 
 */
function signin(data) {
    return post('/api/users/signin', data)
}

/**
 * 登出
 */
function signout() {
    return get('/api/users/signout')
}

export default {
    signup,
    signin,
    signout
}