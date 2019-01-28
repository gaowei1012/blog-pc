import { get, post, del, put } from './axios';
import qs from 'qs';
// 查看分类列表
// qs 直接把拿到的query对象转成我们所需要的格式
function list({current = 1, pageSize = 5, keyword = ''}) {
    return get(`/api/categories?pageNum=${current}&pageSize=${pageSize}&${keyword}`)
}

// 删除列表
function removeList(ids) {
    if (typeof ids == 'string') {
        ids = [ids]; // 变为数组
    }
    return del(`/api/categories/${ids[0]}`, ids)
}

// 增加列表
function addList(data) {
    return post('/api/categories', data)
}

// 修改列表
function updateList(data) {
    return put(`/api/categories/${data.id}`, data)
}

export default {
    list,
    removeList,
    addList,
    updateList
}