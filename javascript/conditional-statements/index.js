// let age = 19;

// if(age > 65) {
//   console.log("Artiq gecdir.");
// } else if(age > 18) {
//   console.log("Xos gelmisiniz!");
// } else {
//   console.log("Yatmaq vaxtidir.");
// } 

// console.log("Program bitti");


// let trafficLight = "asdjnasd";

// if(trafficLight === "green"){
//   console.log("Davem edin");
// } else if(trafficLight === "yellow"){
//   console.log("Hazirlasin");
// } else if(trafficLight ==="red"){
//   console.log("Dayanin");
// } else {
//   console.log("Neynirsen ele");
// }

let trafficLight = "green";

switch(trafficLight){
  case "green":
    console.log("Davam edin");
    break;
  case "red": 
    console.log("Dayanin");
    break;
  case "yellow":
    console.log("Hazirlasin");
    break;
  default:
    console.log("Neynirsen ele");
    break;
}