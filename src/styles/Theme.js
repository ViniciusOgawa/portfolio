import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e0f7fa",
      100: "#b3e5e8",
      200: "#80d4de",
      300: "#4dc3d4",
      400: "#26b5cc",
      500: "#024B61",
      600: "#43818A",
      700: "#57A7B3",
      800: "#66C3D0",
      900: "#014257",
    },
    white: {
      50: "#ffffff",
      100: "#f7f7f7",
      200: "#efefef",
      300: "#e7e7e7",
      400: "#dfdfdf",
      500: "#d7d7d7",
      600: "#cfcfcf",
      700: "#c7c7c7",
      800: "#bfbfbf",
      900: "#b7b7b7",
    },
    gray: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
    black: {
      50: "#171923",
      100: "#1a202c",
      200: "#2d3748",
      300: "#4a5568",
      400: "#718096",
      500: "#1a1a1a",
      600: "#0d0d0d",
      700: "#000000",
    },
  },
  fonts: {
    heading: `'Courier Prime', monospace`,
    body: `'Courier Prime', monospace`,
    mono: `'Courier Prime', monospace`,
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
    "8xl": "6rem", // 96px
    "9xl": "8rem", // 128px
  },
  styles: {
    global: {
      ".courier-prime-regular": {
        fontFamily: "'Courier Prime', monospace",
        fontStyle: "normal",
      },
    },
  },
});

export default theme;
