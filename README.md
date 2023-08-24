# Vue 3 + Vite 4 + mock test

# vite-plugin-mock 大坑

mock 开发环境下没问题，生产环境下不仅需要在 vite.config.js 中配置 viteMockServe 的 prodEnabled 值为 true，而且要参照以下方式修改源码

打开 node_modules/vite-plugin-mock/dist/index.js，源码第 339 行

```
      return {
        map: needSourcemap ? this.getCombinedSourcemap() : null,
        code: `${code}${injectCode}`
      };
```

修改成

```
      return {
        map: needSourcemap ? this.getCombinedSourcemap() : null,
        code: `${injectCode}${code}`
      };
```
