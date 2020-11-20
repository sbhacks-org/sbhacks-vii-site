const assetWidths = {};

function defineAsset(name, widthPx) {
  assetWidths[name] = pxToEm(widthPx);
}

function pxToEm(px) {
  return `${truncateEm(px / 16)}em`;
}

function truncateEm(em) {
  return em.toFixed(3).replace(/\.?0+$/, "");
}

defineAsset("logo_map_cloud", 198);
defineAsset("cloud_front", 180);
defineAsset("cloud_back", 101);
defineAsset("island", 133);
defineAsset("envelope", 114);
defineAsset("wax_seal_submit", 38);
defineAsset("marker_static", 5);

module.exports = {
  plugins: [
    require("@tailwindcss/ui"),
    require("tailwindcss-blend-mode")(),
    require("tailwindcss-image-rendering")(),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {
    extend: {
      animation: ["hover"],
    },
  },
  theme: {
    extend: {
      colors: {
        sea: {
          100: "#32a09d",
          200: "#2c819e",
          300: "#3966a6",
          400: "#2e3590",
          500: "#4d3967",
        },
        seafoam: "#ecfff2",
        prismarine: "#cfe9d7",
        highlight: "#eed067",
        paper: "#ddcfba",
        brown: {
          200: "#af9d87",
          900: "#4e382c",
        },
      },
      fontFamily: {
        sans: ["'Nexa Bold'"],
      },
      width: {
        ...assetWidths,
      },
    },
  },
};
