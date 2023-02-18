import {extendTheme} from 'native-base';
import {BACKGROUND, BORDER, CAPTION, ERROR, PRIMARY, TEXT} from './colors';

export const theme = extendTheme({
  colors: {
    primary: {
      600: '#1F8A70',
    },
    text: TEXT,
    caption: CAPTION,
    border: BORDER,
    background: BACKGROUND,
    appPrimary: PRIMARY,
    error: ERROR,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },

  components: {
    Heading: {
      baseStyle: {
        fontWeight: '600',
      },
      defaultProps: {
        size: 'lg',
      },
    },

    Input: {
      baseStyle: {
        height: '40px',
      },
    },

    Text: {
      baseStyle: {
        _light: {
          color: '#687076',
        },
        _dark: {
          color: '#9BA1A6',
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        _text: {fontWeight: '600'},
      },
      defaultProps: {
        size: 'lg',
      },
      sizes: {
        lg: {
          height: '40px',
          py: 1,
          px: 4,
          _text: {
            fontSize: '14px',
            color: 'white',
          },
        },
        md: {
          height: '40px',
          py: 1,
          px: 4,
          _text: {
            fontSize: '14px',
            color: 'white',
          },
        },
      },
      variants: {
        link: {
          _pressed: {
            _text: {
              textDecorationLine: 'none',
            },
          },
        },
      },
    },
  },
});
