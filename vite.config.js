import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite"; // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import { viteMockServe } from "vite-plugin-mock";

// const localEnabled = process.env.USE_MOCK || false;
// const prodEnabled = process.env.USE_CHUNK_MOCK || false;

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      //设置mock文件存储目录
      mockPath: "./mock/",
      //设置是否启用本地mock文件
      localEnabled: true,
      //设置打包是否启用 mock 功能
      prodEnabled: true,
      //设置是否监视mockPath对应的文件夹内文件中的更改
      watchFiles: true,
      // 监听js
      supportTs: false,
      configPath: "config",
      logger: true, //是否在控制台显示请求日志
      //如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}
      injectCode: `
        import { setupProdMockServer } from '../mock/mockProdServer';
        setupProdMockServer();
      `,
    }),
  ],
  //静态资源服务的文件夹
  publicDir: "public",
  base: "./",
  resolve: {
    //配置别名
    alias: { find: "@", replacement: resolve(__dirname, "src") },
    // 导入时想要省略的扩展名列表
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  // //预览设置  npm run build　打包之后，会生成dist文件 然后运行npm run preview；vite会创建一个服务器来运行打包之后的文件
  preview: {
    port: 4000, //端口号
    host: "localhost",
    cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
    open: true, //是否自动打开浏览器
  },
  //开发配置  npm run dev
  server: {
    port: 5173, //端口号
    strictPort: true, //是否是严格的端口号，如果true，端口号被占用的情况下，vite会退出
    host: "localhost",
    cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
    https: false, //是否支持http2 如果配置成true 会打开https://localhost:3001/xxx;
    open: true, //是否自动打开浏览器
    // 反向代理 跨域配置
    // proxy: {
    //   "/api": {
    //     target: "https://xxxx.com/",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  // 打包配置 npm run build
  build: {
    //指定输出路径
    outDir: "dist",
    //生成静态资源的存放路径
    assetsDir: "assets",
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    //启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    //构建后是否生成 source map 文件
    sourcemap: false,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {},
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 500,
  },
});
