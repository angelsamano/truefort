import { useEffect, useState } from "react";

const getStored = (key, initial) => {
  const stored = JSON.parse(localStorage.getItem(key));

  if (stored) return stored;
  return (initial instanceof Function) ? initial() : initial;
};

const useStorage = (key, initial) => {
  const [value, setValue] = useState(() => getStored(key, initial));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));

    // eslint-disable-next-line
  }, [value]);

  return [value, setValue]
};

export default useStorage;
export const clearStorage = () => localStorage.clear();
