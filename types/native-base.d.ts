import {theme} from '../src/styles/theme';

declare module 'native-base' {
  interface ICustomTheme extends Exclude<typeof theme, 'colors'> {
    colors: typeof theme.colors;
  }
}
