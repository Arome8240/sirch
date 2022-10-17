// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    	spacing: {
    		desktop: '100px',
    		mobile: '10px',
    	},
    	animation: {
    		fade: 'fade 0.4s ease-in-out',
    		slideDown: 'slideDown 1s ease-in-out',
    	},
    	keyframes: {
    		fade: {
    			'0%': {scale: 0, opacity: 0},
    			'100%': {scale: 1, opacity: 1}
    		},
    		slideDown: {
    			'0%': { transform: "translateY(-70px)", opacity: 0},
    			'100%': { transform: "translateY(0)", opacity: 1}
    		}
    	}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}