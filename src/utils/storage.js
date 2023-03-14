// 封装本地存储操作模块

//存储数据
export const setItem = (key, value) => {
    //转成字符串
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}

//获取数据
export const getItem = key => {
    const data = window.localStorage.getItem(key);
    //字符串还原成对象或数组
    try {
        return JSON.parse(data);
    } catch (err) {
        return data
    }
}

//删除数据
export const delItem = (key) => {
    window.localStorage.removeItem(key);
}