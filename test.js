/**
 * 排序后输出 id
 * @param {Array<Object>} list
 * @returns {Array<number>}
 * @example
 * [
 *  { id: 2, before: 1 },
 *  { id: 1, last: true },
 *  { id: 3, after: 1 },
 *  { id: 5, first: true },
 *  { id: 6, last: true },
 *  { id: 7, last: true },
 *  { id: 8, last: true },
 * ];
 * 输出为
 * [5, 2, 1, 3, 6, 7, 8];
 */
function insertBefore(arr, item) {
    const before = arr.filter(itm => itm.id === item.before);
    if (before.length) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === item.before) {
                return arr.slice(0, i).concat(item, arr.slice(i));
            }
        }
    } else {
        return arr.concat(item);
    }
}
function insertAfter(arr, item) {
    const after = arr.filter(itm => itm.id === item.after);
    if (after.length) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === item.after) {
                return arr.slice(0, i + 1).concat(item, arr.slice(i + 1));
            }
        }
    } else {
        return arr.concat(item);
    }
}
function parse(arr) {
    const firtsItems = arr.filter(item => item.first);
    const lastItems = arr.filter(item => item.last);
    let results = [...firtsItems, ...lastItems];
    const restItems = arr.filter(item => !item.first && !item.last);
    for (let item of restItems) {
        if (item.before) {
            results = insertBefore(results, item);
        }
        if (item.after) {
            results = insertAfter(results, item);
        }
    }
    return results;
}

/**
* 将数组转换成树状结构
* @param {Array} arr
* @returns {Object}
* @example
* [
*   { id: 1, name: 'i1' },
*   { id: 2, name: 'i2', parentId: 1 },
*   { id: 4, name: 'i4', parentId: 3 },
*   { id: 3, name: 'i3', parentId: 2 },
*   { id: 8, name: 'i8', parentId: 4 },
* ]
* 转换后
* {
*   id: 1,
*   name: 'i1',
*   children: [
*     { id: 2, name: 'i2', parentId: 1, children: [...] },
*   ]
* }
*/
function convert2Tree(arr) {
    let result = [];
    arr.forEach(item => {
        delete item.children;
    });
    let map = {};
    arr.forEach(item => {
        map[item.id] = item;
    });
    arr.forEach(item => {
        let parent = map[item.parentId];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

/**
* 实现 setInterval
* 1. 利用 setTimeout 实现 setInterval
* 2. 利用 clearTimeout 实现 clearInterval
*/

/**
* @param {Function} callback
* @param {number} duration
* @returns {number}
* @example
* mySetInterval(()=> {
*   console.log('xxx');
* }, 200);
*/

let timeMap = {};
let id = 0;

function mySetInterval(callback, duration) {
    let timeId = id;
    id++;
    let fn = () => {
        callback();
        timeMap[timeId] = setTimeout(() => { fn() }, duration);
    }
    timeMap[timeId] = setTimeout(fn, duration);
    return timeId;
}

/**
* @param {number} timer
* @returns {void}
* @example
* const timer = mySetInterval(()=> {
*   console.log('xxx');
* }, 200);
* setTimeout(() => {
*   myClearInterval(timer);
* }, 1000);
*/
function myClearInterval(timer) {
    clearTimeout(timeMap[timer])
    delete timeMap[timer]
}


