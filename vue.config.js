module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.coingecko.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "/api/v3" }, // Redireciona /api para /api/v3
      },
    },
  },
};
