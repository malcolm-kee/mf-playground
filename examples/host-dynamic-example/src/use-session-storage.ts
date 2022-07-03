import * as React from 'react';

export function useSessionStorage<T extends string>(key: string, initializer: T | (() => T)) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    const initialValue = typeof initializer === 'function' ? initializer() : initializer;

    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return (item as T) || initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
