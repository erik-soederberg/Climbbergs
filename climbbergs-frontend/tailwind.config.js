/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // CUSTOMIZE YOUR COLORS HERE! 🎨
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#22c55e',  // Main brand color
                    600: '#22c55e',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },  
                accent: {
                    DEFAULT: '#f59e0b', // Orange accent
                    light: '#fbbf24',
                    dark: '#d97706',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}