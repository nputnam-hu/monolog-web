import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import config from "./config";

export function useSessionStorage(key, initialValue) {
  // Get the value from sessionStorage or use the initialValue

  const getStoredValue = () => {
    if (!sessionStorage) return null;
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  // Initialize the state with the stored value
  const [value, setValue] = useState(getStoredValue);

  // Use useEffect to update sessionStorage when the state changes
  useEffect(() => {
    if (!sessionStorage) return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useSessionStorage;
