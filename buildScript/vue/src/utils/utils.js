
const tempReg = /\{\{([\w\d]+)\}\}/g;

export function replace(str, obj) {
    let res = str.replace(tempReg, function (res, res1) {
        return obj[res1];
    })
    return res
}
export function getDom(selector) {
    return document.querySelector(selector);
}