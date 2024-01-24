/*
 * @Author: tianxun@https://gitee.com/fummmi
 * @Date: 2024-01-03 10:10:55
 * @Description: Do not edit
 * @LastEditors: fumi 330696896@qq.com
 * @LastEditTime: 2024-01-12 09:49:58
 * @FilePath: \chatgpt-english\src\controllers\chatgptController.js
 */
import { ChatGPTAPI } from "chatgpt";

export class ChatgptController {
  constructor(ctx) {
    this.ctx = ctx;

    this.chatgptAi = new ChatGPTAPI({
      apiKey: "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",
      apiBaseUrl: "https://jiushi21.win/v1",
      dangerouslyAllowBrowser: true,
    });
  }

  async conversation() {
    let { prompt } = this.ctx.request.body;

    prompt = prompt || "a cat";

    let res = await this.chatgptAi.sendMessage(
      prompt + " 这句话的中文是什么，所对应的与语法知识都有哪些？"
    );
    console.log(res.text);

    this.ctx.body = {
      state: "sucess",
      data: res,
      code: 200,
    };
  }
}
