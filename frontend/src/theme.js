// frontend/src/theme.js
// Replace your existing Chakra UI theme with this
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Cormorant Garamond', 'Georgia', serif`,
    body: `'DM Sans', 'Helvetica Neue', sans-serif`,
    mono: `'DM Mono', monospace`,
  },
  colors: {
    brand: {
      50: "#f7f5f2",
      100: "#ede9e1",
      200: "#d6cec0",
      300: "#b8a98e",
      400: "#9e8a6a",
      500: "#8a7255",
      600: "#6e5a40",
      700: "#574630",
      800: "#3d3121",
      900: "#1e1810",
    },
    ink: {
      primary: "#0f0f0f",
      secondary: "#4a4a4a",
      muted: "#9a9a9a",
      faint: "#e8e8e8",
    },
    surface: {
      white: "#ffffff",
      warm: "#faf9f7",
      card: "#f5f4f1",
      border: "#e4e2de",
    },
    accent: {
      gold: "#c9a84c",
      goldLight: "#f0e0a8",
      black: "#0f0f0f",
    },
  },
  space: {
    "18": "4.5rem",
    "22": "5.5rem",
    "88": "22rem",
  },
  fontSizes: {
    "2xs": "0.65rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: `'DM Sans', sans-serif`,
        fontWeight: "500",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontSize: "xs",
        borderRadius: "none",
        transition: "all 0.25s ease",
      },
      variants: {
        solid: {
          bg: "ink.primary",
          color: "white",
          _hover: {
            bg: "brand.600",
            transform: "translateY(-1px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
          _active: { transform: "translateY(0)" },
        },
        outline: {
          border: "1px solid",
          borderColor: "ink.primary",
          color: "ink.primary",
          bg: "transparent",
          _hover: {
            bg: "ink.primary",
            color: "white",
          },
        },
        ghost: {
          color: "ink.secondary",
          _hover: {
            bg: "surface.card",
            color: "ink.primary",
          },
        },
        gold: {
          bg: "accent.gold",
          color: "white",
          _hover: {
            bg: "brand.600",
            transform: "translateY(-1px)",
            boxShadow: "0 8px 24px rgba(201,168,76,0.3)",
          },
        },
      },
      sizes: {
        sm: { h: "9", px: "6", fontSize: "2xs" },
        md: { h: "11", px: "8", fontSize: "xs" },
        lg: { h: "14", px: "12", fontSize: "sm" },
        xl: { h: "16", px: "16", fontSize: "sm" },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: "surface.card",
            border: "1px solid",
            borderColor: "surface.border",
            borderRadius: "none",
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "sm",
            _hover: { bg: "surface.warm", borderColor: "brand.300" },
            _focus: {
              bg: "white",
              borderColor: "ink.primary",
              boxShadow: "none",
            },
          },
        },
      },
      defaultProps: { variant: "filled" },
    },
    Heading: {
      baseStyle: {
        fontFamily: `'Cormorant Garamond', serif`,
        fontWeight: "400",
        color: "ink.primary",
        lineHeight: "1.1",
      },
    },
    Text: {
      baseStyle: {
        fontFamily: `'DM Sans', sans-serif`,
        color: "ink.secondary",
        lineHeight: "1.7",
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: "none",
        fontFamily: `'DM Sans', sans-serif`,
        fontSize: "2xs",
        fontWeight: "500",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        px: "2",
        py: "0.5",
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "surface.border",
        opacity: 1,
      },
    },
  },
  styles: {
    global: {
      "@import": `url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap')`,
      "html, body": {
        bg: "surface.white",
        color: "ink.primary",
        fontFamily: `'DM Sans', sans-serif`,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      "*": {
        boxSizing: "border-box",
      },
      "::selection": {
        bg: "accent.goldLight",
        color: "ink.primary",
      },
      "::-webkit-scrollbar": { width: "4px" },
      "::-webkit-scrollbar-track": { bg: "surface.warm" },
      "::-webkit-scrollbar-thumb": { bg: "brand.300", borderRadius: "none" },
      a: {
        textDecoration: "none",
        transition: "color 0.2s ease",
        _hover: { color: "ink.primary" },
      },
    },
  },
});

export default theme;
