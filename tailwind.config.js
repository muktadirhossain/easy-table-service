/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/bg-pattern-dark.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  // daisyui: {
  //   themes: ["light", "dark", "cupcake","night"],
  // },
};
