import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = (value: number) => setCounter((current) => current + value);
  const decrement = (value: number) => {
    if (counter === 1) return;
    setCounter(current => current - value);
  };
  const reset = () => setCounter(initialValue);

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
