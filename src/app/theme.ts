'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Pacifico, Comfortaa } from 'next/font/google';

const darkTheme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: '#FFC0CB', // cafeBot pink
            contrastText: '#2A1414',
        },

        secondary: {
            main: '#C49A6C', // latte caramel
            contrastText: '#1B0F0A',
        },

        background: {
            default: '#1A1210', // dark espresso
            paper: '#241916', // warm card surface
        },

        text: {
            primary: '#F5E9E6', // milk foam text
            secondary: '#D7BFB9',
        },

        error: {
            main: '#EF9A9A',
        },

        warning: {
            main: '#FFCC80',
        },

        info: {
            main: '#F8AFA6',
        },

        success: {
            main: '#A5D6A7',
        },
    },

    typography: {
        fontFamily: "'Comfortaa', 'Roboto', sans-serif",
        h1: {
            fontFamily: "'Pacifico', cursive",
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#C49A6C',
        },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },

    shape: {
        borderRadius: 16,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    borderRadius: 999,
                    paddingLeft: 20,
                    paddingRight: 20,
                    ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
                        boxShadow: '0 0 12px rgba(255, 192, 203, 0.35)',
                    }),
                }),
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#241916',
                    borderRadius: 20,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                },
            },
        },

        // MuiAppBar: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: '#201512',
        //             color: '#F5E9E6',
        //         },
        //     },
        // },
    },
}));

const lightTheme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: '#FFC0CB', // cafeBot pink
            contrastText: '#4A2C2A',
        },

        secondary: {
            main: '#8B5E3C', // warm coffee brown
            contrastText: '#FFFFFF',
        },

        background: {
            default: '#FFF8F5', // milk foam
            paper: '#FFFFFF',
        },

        text: {
            primary: '#4A2C2A', // espresso text
            secondary: '#7A5C52',
        },

        error: {
            main: '#E57373',
        },

        warning: {
            main: '#FFB74D', // caramel
        },

        info: {
            main: '#F8AFA6', // soft blush
        },

        success: {
            main: '#81C784',
        },
    },

    typography: {
        fontFamily: "'Comfortaa', 'Roboto', sans-serif",
        h1: {
            fontFamily: "'Pacifico', cursive",
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#8B5E3C',
        },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },

    shape: {
        borderRadius: 16,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    borderRadius: 999,
                    paddingLeft: 20,
                    paddingRight: 20,
                    ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
                        boxShadow: '0 4px 10px rgba(255, 192, 203, 0.35)',
                    }),
                }),
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                },
            },
        },

        // MuiAppBar: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: '#FFF0F3',
        //             color: '#4A2C2A',
        //         },
        //     },
        // },
    },
}));

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-pacifico',
    display: 'swap',
});

const comfortaa = Comfortaa({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    variable: '--font-comfortaa',
    display: 'swap',
});

export { darkTheme, lightTheme, pacifico, comfortaa };
