// let a: string = "Hello World";
// let b: number;
// let c: boolean;
// let d: null;
// let e: undefined;
// let f: object;
// let g: any;
// console.log(typeof a);

import { CSSProperties, useRef, useState } from "react";
import Wrapper from "./Wrapper";
import Products from "./Products";
import { Product } from "./types";

// function calculateSum(a:number,b:number): number{
//   return a+b;
// }

// function uppercase(str:string): string {
//   return str.toUpperCase();
// }

// const result:string = calculateSum(10,20)

// let a: any = 15;
// let a: unknown = 15;

// if(typeof a === "string"){
//   console.log(a.toUpperCase());
// }

// let a: number | string;

// a = 10;
// a = "asd";

// function uppercase(a: number | string) {
//   return a.toString().toUpperCase();
// }

// uppercase(10);
// uppercase("asd");

// type varType = boolean;

// let a: varType = true;

// console.log(a);

// const user = {
//   name: "John",
// };

// type User = {
//   name: string;
//   age: number;
//   isNew: boolean;
// };
// type Admin = {
//   adminId: number;
// };
// type GoogleUser = {
//   name: string;
//   age: number;
//   isNew: boolean;
// } & {
//   adminId: number;
// } & {
//   googleId: string;
// };

// type GoogleUser2 = {
//   name: string;
//   age: number;
//   isNew: boolean;
//   adminId: number;
//   googleId: string;
// };

// const googleUser: GoogleUser = {
//   name: "John",
//   age: 12,
//   isNew: true,
//   googleId: "123",
// };

// const user: User = {
//   name: "hello",
//   age: 12,
//   isNew: true,
// };

// function printUser(user: User) {
//   console.log(`Name: ${user.name}, Age: ${user.age}`);
// }

// const googleUser = { name: "test", age: 12, isNew: true, googleId: "test" };

// printUser(user);
// printUser(googleUser);

// function sum(a=2, b= 5): number {
//   return a + b;
// }

// type Profile = {
//   name: string;
//   age: number;
//   isAdmin: boolean;
//   account?: {
//     email: string;
//     password: string;
//   };
// };
// const userAccount: Profile = {
//   name: "John",
//   isAdmin: true,
//   age: 25,
//   account: {
//     email: "nese@gmail.com",
//     password: "1234",
//   },
// };
// console.log(userAccount.account?.email);

// type User = {
//   name: string;
//   age: number;
//   isNew: boolean;
// };
// const names:string[] = ["John", "Doe", "Jane"];
// const numbers:number[] = [1,2,3,4,5];
// const values: (string | number)[] = [1, "John", "Doe", 2, "Jane", 3];
// const account: [number, string] = ["John",1];

// const sallaries = {
//   ahmet: 1000,
//   leyla: 2000,
//   ali: 3000,
//   asd: 3000,
//   ascd : 3000,
//   acsasc: 3000,
//   ascasc: 3000,
// };

// function calculateSallary(sallaries: Record<string, number>) {
//   return Object.values(sallaries).reduce((acc, value) => acc + value, 0);
// }

// console.log(calculateSallary(sallaries));

const styles: CSSProperties = {
  color: "white",
  padding: "1rem",
  fontSize: "1.5rem",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  height: "100vh",
  alignSelf: "center",
  backgroundColor: "black",
  animationComposition: "none",
};

function App() {
  // const products = [
  //   { id: 1, name: "Product 1", price: 10 },
  //   { id: 2, name: "Product 2", price: 20 },
  //   { id: 3, name: "Product 3", price: 30 },
  // ];
  // const ref = useRef<HTMLDivElement>(null);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("submitted");
  // };

  return (
    <div style={styles}>
      {/* <Products
        products={products}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      /> */}

      {/* <input ref={ref} type="text" /> */}
      {/* <div ref={ref}></div>
      <form onSubmit={handleSumbit}>
        <button>submit</button>
      </form> */}
      {/* <button
        onClick={(e) => {
          console.log(e);
        }}
      >
        Click
      </button> */}
      {/* <button onClick={handleDecrement}>-</button>
      <p>{count}</p>
      <button onClick={handleIncrement}>+</button> */}

      {/*       
      <Wrapper>
        <h1>App</h1>
      </Wrapper> */}
    </div>
  );
}

export default App;
