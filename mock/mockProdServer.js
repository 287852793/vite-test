import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
//这里可以把 mock 文件夹下的所有文件都引入
import mock from "./index.js";

console.log(mock);

export function setupProdMockServer() {
  createProdMockServer([...mock]);
}
