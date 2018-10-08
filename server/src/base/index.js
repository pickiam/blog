export default class base {
    transfer (field, params) {
        if (Object.prototype.toString.call(params) !== "[object Array]") {
            throw new Error('参数一定数组');
        }
        let transferObj = {};
        for (let index of params) {
            if (field.hasOwnProperty(index[0])) {
                transferObj[index[1]] = field[index[0]]
            }
        }
        console.log(transferObj)
        return transferObj;
    }
}