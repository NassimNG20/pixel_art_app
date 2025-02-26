import { useState, useCallback } from "react";

// Custom hook for storing pixel colors
export const usePixelColors = (size: number): UsePixelColorsTypes => {
  const [colors, setColors] = useState(() => new Uint32Array(size));

  const setColor = useCallback((index: number, color: number) => {
    setColors((prev) => {
      const newColors = prev.slice();
      newColors[index] = color;
      return newColors;
    });
  }, []);

  const removeColor = useCallback((index: number) => {
    setColors((prev) => {
      const newColors = prev.slice();
      newColors[index] = 0;
      return newColors;
    });
  }, []);

  const clearColors = useCallback(() => {
    setColors(new Uint32Array(size));
  }, [size]);

  const setColorsFromHistory = useCallback((newColors: Uint32Array) => {
    setColors(new Uint32Array(newColors));
  }, []);

  return { colors, setColor, removeColor, clearColors, setColorsFromHistory };
};

// Custom hook for storing pixel coordinates
export const usePixelCoordinates = (size: number): UsePixelCoordinatesTypes => {
  const [coordinates, setCoordinates] = useState<Uint16Array>(
    new Uint16Array(size * 2)
  );

  const setCoordinate = useCallback((index: number, x: number, y: number) => {
    setCoordinates((prev) => {
      const newCoords = prev.slice();
      newCoords[index * 2] = x;
      newCoords[index * 2 + 1] = y;
      return newCoords;
    });
  }, []);

  const removeCoordinate = useCallback((index: number) => {
    setCoordinates((prev) => {
      const newCoords = prev.slice();
      newCoords[index * 2] = 0; // Reset X
      newCoords[index * 2 + 1] = 0; // Reset Y
      return newCoords;
    });
  }, []);

  const clearCoordinates = useCallback(() => {
    setCoordinates(new Uint16Array(size * 2));
  }, [size]);

  const setCoordinatesFromHistory = useCallback(
    (newCoordinates: Uint16Array) => {
      setCoordinates(new Uint16Array(newCoordinates));
    },
    []
  );

  return {
    coordinates,
    setCoordinate,
    removeCoordinate,
    clearCoordinates,
    setCoordinatesFromHistory,
  };
};

export type UsePixelColorsTypes = {
  colors: Uint32Array<ArrayBuffer>;
  setColor: (index: number, color: number) => void;
  removeColor: (index: number) => void;
  clearColors: () => void;
  setColorsFromHistory: (newColors: Uint32Array) => void;
};

export type UsePixelCoordinatesTypes = {
  coordinates: Uint16Array<ArrayBufferLike>;
  setCoordinate: (index: number, x: number, y: number) => void;
  removeCoordinate: (index: number) => void;
  clearCoordinates: () => void;
  setCoordinatesFromHistory: (newCoordinates: Uint16Array) => void;
};
