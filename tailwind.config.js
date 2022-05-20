module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    fontFamily: {
      sans: ["Poppins"],
      serif: ["Poppins"],
      mono: ["Poppins"],
      display: ["Poppins"],
      body: ["Poppins"],
    },
    textShadow: {
      title: "1px 1px 4px #FACC14",
    },
    extend: {
      backgroundImage: {
        "star-wars-bg": "url('./public/images/starwarsbg.jpg')",
      },
      colors: {
        brand: {
          500: "#fff",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-textshadow")],
};
