module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        backgroundColor: (theme) => ({
            ...theme('colors'),
            primary: '#131921',
            button: '#f4d381',
            buttonSearch: '#febd69',
            header: '#131921',
            cartAmount: '#f08804',
        }),
        textColor: (theme) => ({
            ...theme('colors'),
            primary: '#0087b8',
            success: '#067d62',
            danger: '#b12704',
            warning: '#ffa41c',
        }),
        extend: {},
    },
    variants: {
        extend: {
            borderWidth: ['hover'],
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
