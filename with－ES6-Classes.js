// 下面对于上例的情况，我们使用ES6 Classes来实现

class Square {
    constructor(id, shape = 'square', size = 10.5, color = 'green') {
        Object.assign(this, {id, shape, size, color}); // init this
        // this time, all shapes have a location
        this.x = 0;
        this.y = 0;
    }
}

var a = new Array(1e6).fill(0);

// 这里只定义了instance的id值为index
var b = a.map((val, index) => new Square(index));


// The Prototype Stack
// print prototype stack
function showPrototypeStack (obj) {
    let count = 1;
    while (obj) {
        const objectKeys = Object.keys(obj);
        if (objectKeys.length > 0) {
            const str = `[${objectKeys.join(', ')}]`;
            console.log(`[${count++}]: ${str}`);
        }
        else {
            const str = `[${obj.constructor.name}]`;
            console.log(`[${count++}]: ${str}`);
        }
        // 打印__proto__上的信息
        obj = Object.getPrototypeOf(obj);
    }
}


showPrototypeStack({id: 10, shape: 'square', size: 10.5, color: 'green'})
// [1]: [id, shape, size, color]
// [2]: [Object]

showPrototypeStack(b[0]) // show the first Agent's proto stack in array b above
// [1]: [id, shape, size, color, x, y]
// [2]: [Agent]
// [3]: [Object]