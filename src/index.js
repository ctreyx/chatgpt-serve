/*
 * @Author: tianxun@https://gitee.com/fummmi
 * @Date: 2024-01-02 16:41:27
 * @Description: Do not edit
 * @LastEditors: fumi 330696896@qq.com
 * @LastEditTime: 2024-01-24 14:28:10
 * @FilePath: \chatgpt-english\src\index.js
 */
import Koa from "koa";
import koaStatic from "koa-static";
import Router from "koa-router";
import { koaBody } from "koa-body";
import { OpenaiController } from "./controllers/openaiController.js";
import { ChatgptController } from "./controllers/chatgptController.js";
import bodyParser from "koa-bodyparser";
import fs from "fs";
import path from "path";

// import useModule from "./db/useModule.js";
import messageBoardModule from "./db/modules/messageBoardModule.js";

const app = new Koa();
const __dirname = path.resolve();

// 注意的是通常静态服务都是在最前面
app.use(koaStatic(path.join(__dirname, "/public")));

app.use(
  koaBody({
    multipart: true, //
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, "/public/upload"),
      // 是否保留拓展名
      keepExtensions: true,
    },
  })
);

app.use(bodyParser());

const router = new Router();

router.get("/", (ctx) => {
  ctx.body = "hello world";
});

//上传接口
router.post("/uploadAvatar", (ctx) => {
  const file = ctx.request.files.file;

  const basename = path.basename(file.filepath);

  let baseUrl = ctx.origin;
  // 判断有没有带端口，没有带加上8080
  if (baseUrl.indexOf(":") === -1) {
    baseUrl += ":8080";
  }

  ctx.body = { path: `${baseUrl}/upload/${basename}` };
});

//留言板
router.get("/getMessageBoard", messageBoardModule.query);
router.post("/saveMessageBoard", messageBoardModule.save);

router.post("/generateImage", async (ctx) => {
  const openaioController = new OpenaiController(ctx);

  await openaioController.generateImage();
});

router.post("/chatgpt", async (ctx) => {
  const chatgptController = new ChatgptController(ctx);

  await chatgptController.conversation();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
  console.log("server is running at http://localhost:8080");
});
