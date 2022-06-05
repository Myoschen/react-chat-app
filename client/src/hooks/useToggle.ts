import { useState, useCallback } from 'react';

type ReturnType = [
  boolean,
  () => void
]

const useToggle = (initialValue = false): ReturnType => {
  const [value, setValue] = useState(initialValue);
  const setToggle = useCallback(() => setValue((state) => !state), []);
  return [value, setToggle];
};

export default useToggle;
