// let a = 15;

// if (a > 17) {
//   console.log("Boyukdur");
// } else {
//   console.log("Kicikdir");
// }

// console.log(a > 17 ? "Boyukdur" : "Kicikdir");

// let a = 12;

// let b = a > 15 ? a : 13;

// console.log(b);

// let a = 15;

// if (a > 65) {
//   console.log("Boyukdur");
// } else if (a > 17) {
//   console.log("Ortalama");
// } else {
//   console.log("Kicikdir");
// }

// console.log(a > 65 ? "Boyukdur" : a > 17 ? "Ortalama" : "Kicikdir");

// let person = {
//   name: "Suleyman",
//   age: undefined,
// };

// // console.log(person.age || "Bilgi yoxdur");
// console.log(person.age ?? "Bilgi yoxdur");

// Destructuring

// const students = ["Nureddin", "Hesen", "Leyla", "Ignat"];
// const student1 = students[0]
// const student2 = students[1]
// const student3 = students[2]

// const [student1, student2, , student3] = [
//   "Nureddin",
//   "Hesen",
//   "Leyla",
//   "Ignat",
// ];

// console.log(student1, student2, student3);
// const [a, b, c, d, e, ...test] = ["Nureddin", "Hesen", "Leyla", "Ignat"];

// console.log(a, b, c, d);
// console.log(test);

// let a = 12;
// let b = 15;
// [a, b] = [b, a];

// console.log(a, b);

// let c = a;
// a = b;
// b = c;
// console.log(a, b);

// const person = {
//   firstname: "Suleyman",
//   surname: "Dadashov",
//   age: 11,
//   isNew: true,
// };
// let name = person.name;
// let surname = person.surname

// const { firstname, age, ...rest } = person;

// console.log(firstname);
// console.log(age);
// console.log(rest);

// function sum(...args) {
//   return args.reduce((prev, item) => prev + item, 0);
// }

// console.log(sum(3, 5, 23, 123, 123, 12, 3, 23, 2, 32, 3, 2, 5, 45));

// const a = [4, 5, 6];
// const b = [1, 2, 3, ...a];

// console.log(b);

// let test = 12;

// const worker = {
//   test,
//   job: "fe developer",
// };

// console.log(worker);

// console.log(total);

// const person = {
//   name: "Suleyman",
//   surname: "Dadashov",
// };

// const worker = {
//   person: { ...person },
//   job: "fe developer",
// };

// console.log(worker);

// let a = { name: "Test" };
// let b = { ...a };

// a.name = "hello";

// console.log(b.name);

// let arr = [3, 4, 4, 5, 5, 6, 12, 3, 12, 3, 123, 123, 2, 4];
// console.log(Math.max(...arr));

// console.log(obj);
// var obj = 2;
// console.log(obj);

// let a = 12;
// if (a < 15) {
//   var b = 15;
// }

// console.log(b);

// function A() {
//   let a = 12;
//   var b = 15;
// }

// A();
// console.log(b);

// IIFE

// (function (a, b) {
//   console.log("Hello", a, b);
// })(1, 2);

// let person = {
//   car: {
//     model: "Mercedes",
//   },
// };

// try {
//   console.log(person.car.model);
// } catch (err) {
//   console.log("Error: ", err.message);
// }
// console.log("Hello");

// const date = new Date();
// console.log(date.getFullYear());
// console.log(date.getMonth());
// console.log(date.getDate());
// console.log(date.getDay());

// console.log(Date.now());

// let a = 15;
// if (a > 16) console.log("Boyukdur");

// "use strict";

// var a = 15;

// function factorial(num) {
//   if (num === 1) return 1;

//   return factorial(num - 1) * num;
// }

// console.log(factorial(6)); // 6 * 5 * 4 * 3 * 2 * 1

// 6! = 6 * 5! = 6 * 5 * 4! = 6 * 5 * 4 * 3! = 6 * 5 * 4 * 3 * 2! = 6 * 5 * 4 * 3 * 2 *  1

function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();
console.log(counter1()); // 0
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); //
console.log(counter2());
console.log(counter2());
