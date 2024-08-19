// function isEmpty(obj) {
//   return !Object.keys(obj).length;
// }

// console.log(isEmpty({}));

// let salaries = { John: 100, Ann: 160, Pete: 130 };

// function calculateSallary(salaries) {
//   return Object.values(salaries).reduce((prev, val) => prev + val, 0);
// }

// console.log(calculateSallary(salaries));

// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };
// let users = [john, pete, mary];
// let names = users.map((user) => user.name).join(", ");
// console.log(names); // John, Pete, Mary

// function convert(str) {
//   return str
//     .split("")
//     .map((letter) => {
//       if (letter === letter.toUpperCase()) {
//         return letter.toLowerCase();
//       } else {
//         return letter.toUpperCase();
//       }
//     })
//     .join("");
// }

// console.log(convert("saLamNecesen"));

// function clear(arr) {
//   return arr.filter((item) => item);
// }

// console.log(clear([0, 1, false, 2, undefined, "", 3, null, "asd"]));
