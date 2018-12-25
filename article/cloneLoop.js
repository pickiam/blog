function cloneloop (x) {
    let root = {};
    let loopList = [
        {
            parent: root,
            key: undefined,
            data: x
        }
    ]
    while(loopList.length) {
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data
        let res = parent;
        if (typeof key !== undefined) {
            res = parent[key] = {}
        }

        for (let index in data) {
            if (data.hasOwnProperty(index)) {
                if (typeof data[index] == 'object') {
                    loopList.push({
                        parent: res,
                        key: index,
                        data: data[index]
                    })
                } else {
                    res[index] = data[index]
                }
            }
        }
    }
    return root
}