// import { cookies, headers } from "next/headers";

import HomeTabs from "./_components/home-tabs";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    max?: number;
  };
}) {
  const { max = 100 } = searchParams;

  const response = await fetch(
    `https://www.randomnumberapi.com/api/v1.0/random?min=1&max=${max}`
  );
  const data = await response.json();

  return (
    <div>
      <h1>Home</h1>
      <p>Random number: {String(data)}</p>
      <HomeTabs />
    </div>
  );
}
