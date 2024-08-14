// let numbers = [
//   1,
//   "sad",
//   true,
//   null,
//   undefined,
//   function () {
//     console.log("test");
//   },
// ];

// let numbers = new Array();

// console.log(numbers[0]);

// let numbers = [3, 4, 5, 9, 12];

// numbers[numbers.length] = 33;
// numbers[numbers.length] = 35;
// numbers[numbers.length] = 37;
// console.log(numbers[0]);
// console.log(numbers[2]);

// numbers[3] = 12;
// console.log(numbers.at(-4));
// console.log(numbers);

// numbers.push(43);
// numbers.push(49);
// numbers.push(43, 56, "", 99);
// numbers.unshift(12, 21, 23, 32);

// console.log("silinen element: ", numbers.pop());
// numbers.pop();
// numbers.pop();
// numbers.pop();
// numbers.pop();

// numbers.shift();
// numbers.shift();
// numbers.shift();
// numbers.shift();
// numbers.shift();

// console.log(numbers);

// [1, 2, 3, 4, 5]

// let numbers = [3, 4, 5, 9, 12];

// console.log(String(numbers));

// for (let i = 0; i < numbers.length; i++) {
//   console.log(numbers[i]);
// }

// for (let number in numbers) {
//   console.log(number);
// }
// for (let number of numbers) {
//   console.log(number);
// }

// slice

// let numbers = [3, 4, 5, 9, 12];

// console.log(numbers.slice(0, 3).includes(3));

// console.log(numbers.splice(0, numbers.length));
// console.log(numbers.splice(0, 1, 77, "salam", 66, 23));
// console.log(numbers.splice(numbers.length + 4, 0, 33));
// console.log(numbers);

// console.log(numbers.includes(13));

// let numbers = [3, 4, 5, 9, 7, 4, 12];
// let num2 = [5, 6, 7];
// console.log(numbers.concat(num2));
// console.log(numbers.indexOf(4));
// console.log(numbers.lastIndexOf(4));
// numbers.reverse();
// console.log(numbers);

// console.log(numbers.join());

// let str = "s&l&m";
// console.log(
//   str.replaceAll("&", "a").toUpperCase().split("").reverse().join("")
// );

// let a = 12;
// let b = a;
// a = 13;
// console.log(b);

// let a = [1, 2, 3];
// let b = a;
// a[0] = 4;
// console.log(b);

// let a = [1, 2, 3];
// let b = a;
// a = [2, 3, 4];

// console.log(b);

// function increaseArr(arr) {
//   arr = [2, 3, 4];
// }

// let nums = [1, 2, 3];
// increaseArr(nums);
// console.log(nums);

// function increaseNum(num){
//   num++;
// }

// let a = 12;
// increaseNum(a);
// console.log(a);

// function A(){

// }

// let a = function () {};

// numbers.forEach(A);
// numbers.forEach(b);
// numbers.forEach(function(){});

// let numbers = [13, 15, 16, 22, 35, 45];
// let names = ["Ignat", "Leyla", "Murad", "Hesen", "Orxan"];

// Array.prototype.forEach =  (callback) => {
//   for(let i = 0; i < this.length; i++){
//     callback(this[i], i, this);
//   }
// }

// const result = numbers.forEach((num, idx, arr) => {
//   // console.log(num ** 2);
//   return num * 2;
// });
// let numbers = [13, 15, 16];

// numbers.forEach((num, idx, arr) => {
//   console.log(num);
// });

// console.log("numbers", numbers);
// console.log("result", result);

// names.map((ad) => {
//   console.log(ad);
// });

// let numbers = [13, 15, 16, 22, 35, 45];

// const result = numbers.find((item, i) => {
//   return item;
// });
// const result = numbers.findIndex((item, i) => {
//   return item > 55;
// });
// const result = numbers.filter((item, i) => {
//   return i % 2 === 1;
// });

// console.log(result);

// let numbers = [13, 15, 16, 22, 35, 45];

// let res = numbers.every((item) => {
//   return item > 0;
// });
// let res = numbers.some((item) => {
//   return item < 0;
// });

// console.log(res);

// const numbers = [3, 5, 2, 7, 10, 100, 1000, 15, 1];

// numbers.sort((t, e) => {
//   return t - e;
// });

// console.log(numbers);
