// 案例 1: 变量使用 any 类型
let anyVariable: any = 10;
console.log(anyVariable); // 输出: 10

anyVariable = "Hello, World!";
console.log(anyVariable); // 输出: Hello, World!

anyVariable = { name: "John", age: 30 };
console.log(anyVariable); // 输出: { name: 'John', age: 30 }

// 案例 2: 函数参数使用 any 类型
function printAny(input: any) {
  console.log(input);
}

printAny(123); // 输出: 123
printAny([1, 2, 3]); // 输出: [1, 2, 3]

// 案例 3: 对象属性使用 any 类型
interface AnyObject {
  [key: string]: any;
}

const myObject: AnyObject = {
  id: 1,
  name: "Alice",
  data: { value: "extra info" }
};

console.log(myObject.id); // 输出: 1
console.log(myObject.data.value); // 输出: extra info

// 案例 4: 数组使用 any 类型
const anyArray: any[] = [1, "two", true];
console.log(anyArray[1]); // 输出: two
