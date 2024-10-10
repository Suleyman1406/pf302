// const a: "asd" = "asd";
// let b:unknown;

import { useState } from "react";
import Button from "./Button";

// b = 12;
// b = "asd";

// if(typeof b === "string") {
//   b.toLowerCase();
// }

// type MyType = boolean | string;

// type MyType2 = {
//   a: number;
//   b: number;
// };

// const b: MyType2 = {
//   a: 1,
//   b: 2,
// };

// const a: MyType = "asd";

// function add(a: number, b: number): number|string {
//   return a + b +"";
// }

// add(1, 2);

// type User = {
//   name: string;
//   age: number;
// };
// function printData({ name, age }: User) {
//   console.log(name + " " + age);
// }

// const printData = (a: number, b: string): string => {
//   return a + b;
// };

// type Browser = {
//   name: string;
//   version?: number | null;
// }

// type Safari = Browser & {
//   osId: string;
// }

// type UnionType = number | string | boolean;

// let a: UnionType = {};

// type GoogleUser = {
//   googleId: string;
//   name: string;
//   email: string;
//   avatar: string;
// };

// type GithubUser = {
//   githubId: string;
//   name: string;
//   email: string;
//   avatar: string;
// };

// const user: GoogleUser | GithubUser = {
//   githubId: "123",
//   name: "John",
//   email: "testasd",
//   avatar: "asd",
// };

// type Color = "red" | "green" | "blue" | "black" | "" | undefined;
// type Variant = "outlined" | "primary" | "secondary";

// // let color: Color;

// type ButtonProps = {
//   variant?: Variant;
//   color?: Color;
// };
// function Button({ variant, color }: ButtonProps) {
//   if (variant === "outlined") {
//     return <button style={{ border: `1px solid ${color}` }}>Click me</button>;
//   }
//   if (variant === "primary") {
//     return <button style={{ background: color }}>Click me</button>;
//   }

//   return <button style={{ color }}>Click me</button>;
// }

// type User = {
//   name: string;
//   age: number;
// };

// interface User {
//   name: string;
//   age?: number;
// }

// const user: User = {
//   name: "John",
//   age: 12,
// };

// type Browser = {
//   name: string;
//   version?: number | null;
// }

// type Safari = Browser & {
//   osId: string;
// }

// interface Browser {
//   name: string;
//   version?: number | null;
// }

// interface Safari extends Browser {
//   osId: string;
// }

// const browser: Safari = {
//   name: "Safari",
//   version: 12,
//   osId: "123",
// };

// type MyType = boolean | string;
// interface MyType {

//   test: boolean | string;
// }

// let a: MyType = true;
// let a :MyType = {
//   test: "asd"
// }

// interface IUser{
//   readonly name: string;
// }

// // type TUser ={}

// const user :IUser = {
//   name: "John"
// }

// user.name = "asdasd";

// type User = {
//   name: string;
//   surname: string;
//   email: string;
//   password: string;
//   phoneNumber?: string;
// };

// const user: User & { password: string } = {

// const user: Omit<User, "password"> =
//   {

//   };

// const user: Pick<User, "name" | "surname"> = {
//   name: "John",
//   surname: "Doe",
// };

// const user: Partial<User> = {
// }

// const user:Required<User> = {
// }

// const user: Readonly<User> = {
//   name: "John",
//   surname: "Doe",
//   email: "asd",
//   password: "asd",
// };

// console.log(user.email);
// user.email = "asd"

// let content: unknown = "asd";
// console.log((content as string).toUpperCase());

// const userKey: keyof User = ""

// const user = {
//   name: "John",
//   surname: "Doe",
//   email: "asd",
//   password: "asd",
// };

// console.log();

// const newUser: typeof user = {
// };

// const statuses = ["active", "inactive", "pending"] as const;
// statuses[0] = "asd";
// const status = statuses[0];
// const status1 = statuses[1];
// console.log();

function App() {
  // const [clickCount, setClickCount] = useState(0);
  // return <Button variant="primary" color="red" />;
  return (
    <div>
      {/* <Button
        setClickCount={setClickCount}
        clickCount={clickCount}
        color="green"
      >
        Click me
      </Button> */}
    </div>
  );
}

export default App;
