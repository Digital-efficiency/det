import { useState } from 'react';
import { hexToRgb, hslToHex, rgbToHsl } from '@/utils';
import type { HEXTypes, HSLTypes, RGBTypes } from '@/types';

/**
 * useColorConverter - A custom hook for managing and converting color formats (HEX, RGB, HSL).
 *
 * @param initialColor - The initial HEX color value, of type HEXTypes.
 * @returns {Object} - Returns an object containing the current HEX, RGB, and HSL color values, 
 *                     along with a function to handle color changes.
 * 
 * @example
 * const { hex, rgb, hsl, handleColorChange } = useColorConverter('#ffffff');
 * handleColorChange({ r: 255, g: 0, b: 0 }, 'rgb'); // Change color to RGB format
 */
const useColorConverter = (initialColor: HEXTypes) => {
  const [hex, setHex] = useState(initialColor);
  const [rgb, setRgb] = useState(hexToRgb(initialColor));
  const [hsl, setHsl] = useState(rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null);

  /**
   * handleColorChange - Handles color changes based on the provided format.
   *
   * @param color - The color value to be converted, can be in HEX, RGB, or HSL format.
   * @param format - A string indicating the format of the provided color, 
   *                 can be 'hex', 'rgb', or 'hsl'.
   */
  const handleColorChange = (color: HEXTypes | HSLTypes | RGBTypes, format: string) => {
    switch (format) {
      case 'hex': {
        setHex(color as string);
        const rgb = hexToRgb(color as string);
        if (rgb) {
          setRgb(rgb);
          setHsl(rgbToHsl(rgb.r, rgb.g, rgb.b));
        }
        break;
      }
      case 'rgb': {
        const value = color as RGBTypes;
        setRgb(value);
        const hsl = rgbToHsl(value.r, value.g, value.b);
        setHex(hslToHex(hsl.h, hsl.s, hsl.l));
        setHsl(hsl);
        break;
      }
      case 'hsl': {
        const value = color as HSLTypes;
        setHsl(value);
        const hex = hslToHex(value.h, value.s, value.l);
        setHex(hex);
        setRgb(hexToRgb(hex));
        break;
      }
      default:
        break;
    }
  };

  return { hex, rgb, hsl, handleColorChange };
};

export default useColorConverter;