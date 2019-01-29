import { get, post, del, put } from './axios';
// 查看分类列表
// qs 直接把拿到的query对象转成我们所需要的格式
function list({current = 1, pageSize = 5, keyword = '', category}) {
    return get(`/api/articles?pageNum=${current}&pageSize=${pageSize}&${keyword}`)
}

// 删除列表
function removeList(ids) {
    if (typeof ids == 'string') {
        ids = [ids]; // 变为数组
    }
    return del(`/api/articles/${ids[0]}`, ids)
}

// 增加列表
function addList(item) {
    console.log(item)
    return post('/api/articles', item)
}

// 修改列表
function updateList(item) {
    return put(`/api/articles/${item.id}`, item)
}

export default {
    list,
    removeList,
    addList,
    updateList
}