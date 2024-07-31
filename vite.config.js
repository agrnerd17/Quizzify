import { resolve } from "path";
export default {
  root: resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
    rollupOptions: {
      //configure routes here
      //refer to: https://vitejs.dev/guide/build.html#multi-page-app
      input: {
        main: resolve(__dirname, "src/index.html"),
        quizzes: resolve(__dirname, "src/quizzes/index.html"),
      },
    },
  },

  server: {
    port: 3000,
  },
};
