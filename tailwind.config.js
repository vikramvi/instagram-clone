module.exports = {
    future: {
        removeDeprecatedGapUtilities: true
    },
    theme: {
        extend: {
            fill: (theme) => ({
                red: theme('colors.red.primary')
            }),
            colors: {
                white: '#ffffff',
                blue: {
                    medium: '#005c98'
                },
                black: {
                    light: '#262626',
                    faded: '#00000059'
                },
                gray: {
                    base: '#616161',
                    background: '#fafafa',
                    primary: '#dbdbdb'
                },
                red: {
                    primary: '#ed4956'
                }
            },
            spacing: {
                '128': '32rem', // following the standard of 128 / 4 = 32
            }
        }
    },
    variants: {
        extend: {
            display: ['group-hover']
        }
    }
};