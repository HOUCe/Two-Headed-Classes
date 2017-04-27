// The standard (one-headed) Shape has only one data layer.
// like this: 
// [1]: [id, shape, size, color, x, y]
// [2]: [Agent]
// [3]: [Object]

// Just add a second data layer
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

var two = Object.create(b[0]) // use an shapre as prototype
two.id = 42 // “promote” id to top Object

console.log(b[0].id, two.id) // prints: 0 42

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


showPrototypeStack(two);
// [1]: [id]
// [2]: [id, shape, size, color, x, y]
// [3]: [Agent]
// [4]: [Object]




// Finished Product
class ShapeProto {
    constructor() {
        Object.assign(this, ShapeProto.defaults());
    } 

    newShape (id, x, y) {
        const obj = Object.create(this);
        return Object.assign(obj, {id, x, y});
    }

    setDefault (name, value) {
        this[name] = value;
    }

    getDefault (name) {
        return this[name];
    }

    static defaults() {
        return {
            id: null,
            x: 0,
            y: 0,
            shape: 'square',
            size: 10.5,
            color: 'red',
            strokeColor: 'yellow',
            hidden: false,
            label: null,
            labelOffset: [0, 0],
            labelFont: '10px sans-serif',
            labelColor: 'black'
        }
    }
}

// practice
var shapeProto = new ShapeProto();
// 调用agentProto上的newShape方法，d中每一项对象自身属性为id, x, y; 原型上也存在包括id, x, y在内的多项属性。
var d = a.map((val, index) => shapeProto.newShape(index, index/10, -index/10))

// 这种情况下：
d.every((item) => item.shape === 'square'); // true, 在item原型上
shapeProto.setDefault('shape', 'circle'); // 改变了item原型上的shape属性
d.every((item) => item.shape === 'square') // false
d.every((item) => item.shape === 'circle') // true

d[0].shape = 'triangle'; // 注意，这个更改是给该实例增加了实例上自身的shape属性，该实例的原型上也存在shape属性
d.every((item) => item.shape === 'circle') // false
d[0].shape = 'circle'
d.every((item) => item.shape === 'circle') // true

d[0].shape = 'triangle'
d.every((item) => item.shape === 'triangle') // false
agentProto.setDefault('shape', 'triangle')
d.every((item) => item.shape === 'triangle') // true









// 上面的方法保证里每一个实例，自身的默认属性只有id, x, y;
// 来对比下下面的方法：
function fatShape (id, x, y) {
    const a = new ShapeProto();
    return Object.assign(a, {id, x, y})
}
e = a.map((val, index) => fatAgent(index, index/10, -index/10));
// 这样的话（不使用Object.create），每个实例都有默认的所有自身属性。
// 可以对比一下内存开销











