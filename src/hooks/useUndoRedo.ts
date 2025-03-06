import { useEffect } from "react";

export interface KeyPressOptions {
  key: string;
  ifCtrl?: boolean; // Optional: If true, requires Ctrl key
  method: () => void; // Function to execute
}

export function useKeyPressWithCtrl({
  key,
  ifCtrl = false,
  method,
}: KeyPressOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        (!ifCtrl || event.ctrlKey) // If `ifCtrl` is true, `Ctrl` must be held
      ) {
        event.preventDefault(); // Prevent default behavior (optional)
        method();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, ifCtrl, method]); // Dependencies
}
