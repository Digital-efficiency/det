import type { HEXTypes, HSLTypes, RGBTypes } from "@/types";

// hex to rgb
export function hexToRgb(hex: string): RGBTypes | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16)
  } : null;
}

// rgb to hsl
export function rgbToHsl(r: number, g: number, b: number): HSLTypes {
  const rNormalized = r / 255;
  const gNormalized = g / 255;
  const bNormalized = b / 255;
  const max = Math.max(rNormalized, gNormalized, bNormalized);
  const min = Math.min(rNormalized, gNormalized, bNormalized);
  let h = 0;
  let s: number;
  const l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNormalized:
        h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
        break;
      case gNormalized:
        h = (bNormalized - rNormalized) / d + 2;
        break;
      case bNormalized:
        h = (rNormalized - gNormalized) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// hsl to hex
export function hslToHex(h: number, s: number, l: number): HEXTypes {
  const hNormalized = h / 360;
  const sNormalized = s / 100;
  const lNormalized = l / 100;
  let r: number;
  let g: number;
  let b: number;

  if (sNormalized === 0) {
    r = g = b = lNormalized; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      let tNormalized = t;
      if (t < 0) tNormalized += 1;
      if (t > 1) tNormalized -= 1;
      if (t < 1/6) return p + (q - p) * 6 * tNormalized;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - tNormalized) * 6;
      return p;
    };

    const q = lNormalized < 0.5 ? lNormalized * (1 + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized;
    const p = 2 * lNormalized - q;
    r = hue2rgb(p, q, hNormalized + 1/3);
    g = hue2rgb(p, q, hNormalized);
    b = hue2rgb(p, q, hNormalized - 1/3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}