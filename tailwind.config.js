/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'background': "url('/bg.png')",
            }
        },
        colors: {
            // 'main': "#1178D7",
            // 'secondary': "#008A61",
            // 'accent': "#F8F8F8",
            'secondary': "#B8558D",
            'textMain': "#F1F1F1",
            'textSecondary': "#FABDE0",
            'textAccent': "#af5288",
        },
        fontFamily:{
            mulish:['Mulish', 'sans-serif'],
        },
        screens: {
            'small':{
                'max':'800px'
            }
        },
    },
    variants: {
        display:['group-hover']
    },
    plugins: [],
}
