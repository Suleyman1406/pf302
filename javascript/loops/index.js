// Loops - Donguler

// for - while - do_while

// for

// for(let i = 8; i < 9; i--) {
//   console.log(i);
// }

// console.log("Program bitti");

// for(let i = 1; i < 100; i++){
//   if(i % 3 === 0 && i % 5 === 0){
//     console.log(i);
//   }
// }


// While
// let i = 0; // 1 2 3 ... 10


// while(i < 10){
//   console.log(++i); 
// }
// // 1 2 3 ... 10

// let isNew = true; // false
// let i = 1; // 2 3 4 5 6 7 8

// while(isNew){
//   console.log(++i); // 
//   if(i % 7 === 0){
//     isNew = false;
//   }
// }

// let i = 5; // 6
// do {
//   console.log(i++);
// } while(i > 6)

// for(;;){
//   console.log("Sonsuzluq");
// }

// while(true){

// }


// break - for, while, do_while
// continue - for


// for(let i = 0; i < 10; i++){
//   console.log(i);
//   if(i===4){
//     break;
//   }
// }
// for(let i = 0; i < 10; i++){
//   if(i%3==0){
//     continue;
//   }
//   console.log(i);
// }

// const numbers = [ 2, 6, 12, 9, 23, 33, 8, 22];
// console.log(numbers[0]);

// for(let i = 0; i < numbers.length; i++){
//   if(numbers[i] % 3 === 0){
//     console.log(numbers[i]);
//   }
// }

// const numbers = [1, 4, 5];
// let total = 0; // 1 + 4 + 5 = 10

// for(let i = 0; i < numbers.length; i++){
//   total += numbers[i];
//   console.log(total);
// }

// let numbers = [1, 3, 4, 5];

// let total = 1;

// for(let i = 0; i < numbers.length; i++){
//   total *= numbers[i];
// }
// console.log(total);



// let numbers = [1, 3, 4, 5, 7];

// let total = 0;

// for(let i = 0; i < numbers.length; i++) {
//   if(i % 2 === 0){
//     total += numbers[i];
//   }
// }

// console.log(total);



// for(let i = 1; i < 10; i *= 2){
//   console.log(i);
// }


// for(let i = 0; i < 3; i++){
//   for(let j = 0; j < 3; j++){
//     console.log("i: ", i, " j:", j);
//   }
// }
              // 0, 1,  2,  3,  4,  5, 6,   7
// const numbers = [1, 4, -6, 11, -3, 22, 15, -4];

// let positiveTotal = 0;
// let negativeTotal = 0;

// for(let i = numbers.length - 1; i >= 0; i--){
//   if(numbers[i] > 0){
//     positiveTotal += numbers[i];
//   } else {
//     negativeTotal += numbers[i];
//   }
// }

// console.log("negative: ", negativeTotal, " positive: ", positiveTotal);


// 1 2 3 5 7 11 

let value = 2;
let isPrime = true;


// 13
// 2 3 4 5 6 7 8 9 10 11 12 



for(let i = 2; i < value/2; i++){
  if(value % i === 0){
    isPrime = false;
    break;
  }
}
console.log("isPrime: ", isPrime);

