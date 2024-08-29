// const cdPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(["Nese", "Nese", "Nese"]);
//     // reject("Error occured!");
//   }, 4000);
// });

// cdPromise
//   .then((data) => {
//     console.log("Promise resolved", data);
//   })
//   .catch((err) => {
//     console.log("Promise rejected", err);
//   })
//   .finally(() => {
//     console.log("Promise finished");
//   });

// const a = new Promise((resolve, reject) => {
//   // resolve([1, 2, 3]);
//   reject("Something went wrong!");
// });

// console.log(a);

// function logAfterFiveSecond(message) {
//   new Promise((res) => {
//     setTimeout(() => {
//       res();
//     }, 5000);
//   }).then(()=>{
//     console.log(message);
//   });
// }

// const musics = [];
// const promise = new Promise((res, rej) => {
//   setTimeout(() => {
//     if (musics.length > 0) {
//       res(musics);
//     } else {
//       rej("Music not found!");
//     }
//   }, 2000);
// });

// setTimeout(() => {
//   musics.push("Hello Everyone");
// }, 1900);

// promise
//   .then((data) => {
//     console.log("Resolved", data);
//   })
//   .catch((err) => {
//     console.log("Rejected", err);
//   });

// function getPromise(bool) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       if (bool) {
//         res("Resolved");
//       } else {
//         rej("Rejected");
//       }
//     }, 0);
//   });
// }
// const promise = getPromise(true);

// promise
//   .then((data) => {
//     console.log(data); // Resolved
//     return getPromise(true);
//   })
//   .then((data) => {
//     console.log(data); // Resolved
//     return "salam";
//   })
//   .then((data) => {
//     console.log(data); // salam
//     return new Error("test");
//   })
//   .catch((err) => {
//     console.log(err); // test
//   })
//   .then((data) => {
//     console.log(data); // undefined
//   });

// await getPromise(true);

// async function getData() {
//   console.log("Geldi");
//   const result = await getPromise(true);
//   console.log("Getdi");
//   console.log(result);
// }

// getData();
// console.log("Finished");

// function getPromise(bool) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       if (bool) {
//         res("Resolved");
//       } else {
//         rej("Rejected");
//       }
//     }, 0);
//   });
// }
// async function getData() {
// try{
//   // await getPromise()
// }catch(err){
// }
// getPromise(true).then(()=>{})
// return 1;
// }

// console.log("Result", getData());
