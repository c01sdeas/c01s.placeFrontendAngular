/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class="app-dark"]'],
    content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [PrimeUI],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                // inter: ['Inter', 'sans-serif'],
                // microfive: ['Micro 5 Charted', 'sans-serif'],
                lato: ['Lato', 'sans-serif'],
                // orbitron: ['Orbitron', 'sans-serif'],
                // jerseycharted: ['Jersey 10 Charted', 'sans-serif'],
                anta: ['Anta', 'sans-serif']
            }
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
        
    }    
};
