import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

export const zincColors = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#09090b',
};

export const customLightTheme: Theme = {
  dark: false,
  fonts: DefaultTheme.fonts,
  colors: {
    ...DefaultTheme.colors,
    background: zincColors[50],
    text: zincColors[900],
    border: zincColors[200],
    // apple blue
    primary: '#007AFF', //change later maybe
  },
};

export const customDarkTheme: Theme = {
  dark: true,
  fonts: DarkTheme.fonts,
  colors: {
    ...DarkTheme.colors,
    background: zincColors[900],
    text: zincColors[50],
    border: zincColors[700],
    primary: '#007AFF', //change later maybe
  },
};
