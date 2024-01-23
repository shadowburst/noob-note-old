import animate from 'tailwindcss-animate';
import { slate } from 'tailwindcss/colors';

const colors = {
    primary: {
        DEFAULT: '#3E92CC',
        50: '#f3f7fc',
        100: '#e5eff9',
        200: '#c6def1',
        300: '#93c3e6',
        400: '#59a4d7',
        500: '#3e92cc',
        600: '#246ca5',
        700: '#1e5786',
        800: '#1d4a6f',
        900: '#1d405d',
        950: '#13293e',
    },
    success: {
        DEFAUKT: '#ACE4AA',
        50: '#f3fbf2',
        100: '#e2f7e1',
        200: '#c7edc5',
        300: '#ace4aa',
        400: '#66c662',
        500: '#3fab3c',
        600: '#308c2d',
        700: '#286f26',
        800: '#245823',
        900: '#1e491e',
        950: '#0c270c',
    },
    warning: {
        DEFAULT: '#ffc482',
        50: '#fff7ed',
        100: '#ffeed4',
        200: '#ffd8a9',
        300: '#ffc482',
        400: '#fe9539',
        500: '#fc7613',
        600: '#ed5b09',
        700: '#c54309',
        800: '#9c3510',
        900: '#7e2e10',
        950: '#441506',
    },
    danger: {
        DEFAULT: '#db5461',
        50: '#fdf3f3',
        100: '#fbe8e8',
        200: '#f7d4d5',
        300: '#f1b0b3',
        400: '#e8848b',
        500: '#db5461',
        600: '#c7374c',
        700: '#a7293f',
        800: '#8c2539',
        900: '#782337',
        950: '#420f19',
    },
};

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx,vue}',
        './components/**/*.{ts,tsx,vue}',
        './app/**/*.{ts,tsx,vue}',
        './src/**/*.{ts,tsx,vue}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                body: slate,
                ...colors,
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [animate],
};
