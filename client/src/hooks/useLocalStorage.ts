import {
  useState,
} from 'react';

type ReturnType<T> = [
  T,
  (value: T | ((val: T) => T)) => void
]

const useLocalStorage = <T, >(key: string, initialValue?: T): ReturnType<T> => {
  const [state, setState] = useState<T>(() => {
    try {
      // Get value from local storage
      const valueOfLocalStorage = window.localStorage.getItem(key);
      return valueOfLocalStorage ? JSON.parse(valueOfLocalStorage) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Determine whether it is a function
      const valueToLocalStorage = value instanceof Function ? value(state) : value;
      // Save to state
      setState(valueToLocalStorage);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToLocalStorage));
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
