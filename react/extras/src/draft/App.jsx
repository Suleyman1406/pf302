import { useState } from "react";
import A from "./A";
import B from "./B";
import C from "./C";
import { useMemo } from "react";
import { useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("asc");

  const products = useMemo(() => {
    const data = [
      { id: 1, name: "product 1" },
      { id: 2, name: "product 2" },
      { id: 3, name: "product 3" },
    ];

    data.sort((a, b) => {
      if (sort === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    return data;
  }, [sort]);

  const getData = useCallback(() => {
    console.log("getData called with", sort);
  }, [sort]);

  const createToast = () => {
    toast.succes("Successfully created");
  };

  return (
    <>
      <select
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
      <button onClick={() => setCount((prev) => prev + 1)}>Click</button>
      <A count={count} />
      <B products={products} />
      <C getData={getData} />
    </>
  );
}

export default App;
