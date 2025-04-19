// 基础类型（和 JS 类似，但多了类型限制）
let num: number = 10;         // 数字
let str: string = "hello";    // 字符串
let bool: boolean = true;     // 布尔值
let arr: number[] = [1, 2, 3];// 数组（或用 number[] 或 Array<number>）
let nullVal: null = null;     // null（需开启 strictNullChecks）
let undefinedVal: undefined = undefined; // undefined

// 任意类型（谨慎使用，失去 TS 意义）
let anyVal: any = "随便什么类型";

// 联合类型：一个变量可以是多种类型中的一种
let name: string | number = "小明"; // 可以是字符串或数字
name = 18; // 合法

// 交叉类型（重点！遇到的 & 就是这个）：合并多个类型为一个新类型
type A = { name: string };
type B = { age: number };
type AB = A & B; // 同时拥有 name 和 age 属性
const person: AB = { name: "张三", age: 18 }; // 正确