// We’ll start looking at the size of simple objects, using Chrome DevTools. 
// Go to an about:blank page. Open the JavaScript console and paste this into it:

// A 1MB filled array for map to use
// a是一个长度为1000000的数组，数组每一项都为0
var a = new Array(1e6).fill(0);

// create variable b
// b是一个数组，数组每个元素为一个对象，该对象属性为id，值为index
var b = a.map((val, index) => ({id: index}));

// create variable c
// b是一个数组，数组每个元素为一个对象，该对象除了id属性，还包括shape，size，color
// 这就描述了1000000个size为10.5，颜色为绿色的正方形
var c = b.map((val, index) => ({id: index, shape: 'square', size: 10.5, color: 'green'}))