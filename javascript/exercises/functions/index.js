const numbers = [2, 2, 3, 5, 6, 9, 6, 5, 9];
// i = 0
// j = 1

// function findUnique(nums) {
//   root: for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < nums.length; j++) {
//       if (nums[i] === nums[j] && i !== j) {
//         continue root;
//       }
//     }
//     console.log(nums[i]);
//   }
// }
// function findUnique(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     let count = 0;
//     for (let j = 0; j < nums.length; j++) {
//       if (nums[i] === nums[j]) {
//         count++;
//       }
//     }
//     if (count === 1) {
//       console.log(nums[i]);
//     }
//   }
// }

// findUnique(numbers);

// function findOverLimit(numbers, limit){
//   const newArr = [];

//   for(let number of numbers){
//     if(number > limit){
//       newArr.push(number)
//     }
//   }

//   return newArr;
// }
