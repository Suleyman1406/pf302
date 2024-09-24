import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  changeByValue,
  changeByValueAsync,
  decrement,
  increment,
  reset,
  selectCounter,
} from "../../redux/features/counter/counterSlice";
import { useRef } from "react";
import { Spinner } from "../shared/Spinner";

export const Counter = () => {
  const { number, isLoading } = useSelector(selectCounter);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-xl tracking-widest">Count: {number}</p>
      <div className="flex gap-3">
        <button
          onClick={() => {
            dispatch(decrement());
          }}
          className="border-purple-200 border px-3 py-1"
        >
          -
        </button>
        <button
          onClick={() => {
            dispatch(reset());
          }}
          className="border-purple-200 border px-3 py-1 uppercase"
        >
          reset
        </button>
        <button
          onClick={() => {
            dispatch(increment());
          }}
          className="border-purple-200 border px-3 py-1"
        >
          +
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(changeByValueAsync(inputRef.current.valueAsNumber));
          inputRef.current.value = "";
        }}
        className="flex"
      >
        <input
          ref={inputRef}
          type="number"
          disabled={isLoading}
          className="border-purple-200 border px-3 py-1"
          placeholder="Enter a number"
        />
        <button className="flex items-center gap-2 border-l-0 border-purple-200 border px-3 py-1 !outline-0 ring-0 ring-red-500 focus-visible:!outline-none focus-visible:ring-0 ">
          {isLoading && <Spinner />}
          Async Change
        </button>
      </form>
    </div>
  );
};
