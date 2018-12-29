## 排序

### 冒泡排序

```javascript
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = len - 1; len >= 2; i--) {
        for (let k = 0; k < i - 1; k++) {
            if (arr[k] > arr[k + 1]) {
                [arr[k], arr[k + 1]] = [arr[k + 1], arr[k]]
            }
        }
    }
    return arr;
}
```

### 选择排序

```javascript

function selecSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i; j < len -2; j++) {
            if (arr[i] < arr[j]) {
                [arr[i],arr[j]] = [arr[j],arr[i]];
            }
        }
    }
    return arr;
}
```

### 插入排序

```javascript

function insertSort(arr) {
    for(let i = 1; i < arr.length; i++) {  
        for(let j = i; j > 0; j--) {  
            if(arr[j] < arr[j-1]) {
                [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
            } else {
                break;
            }
        }
    }
    return arr;
}









































































### 参考文章
[https://juejin.im/post/5b72f0caf265da282809f3b5]