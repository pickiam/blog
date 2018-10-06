export default class base {
    async transfer (field, params) {
        if (Object.prototype.toString.call(params) !== "[object Array]") {
            throw new Error('参数一定数组');
        }
        const transferObj = {};
        for (let index of params) {
            if (field[index[0]]) {
                transObj[index[1]] = field[index[0]]
            }
        }
        return transferObj;
    }
}