/*
 * @Author: tianxun@https://gitee.com/fummmi
 * @Date: 2024-01-03 10:10:55
 * @Description: Do not edit
 * @LastEditors: fumi 330696896@qq.com
 * @LastEditTime: 2024-01-04 16:53:32
 * @FilePath: \chatgpt-english\src\controllers\openaiController.js
 */
import OpenAI from "openai";

export class OpenaiController {
  constructor(ctx) {
    this.ctx = ctx;
    this.openai = new OpenAI({
      apiKey: "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", // This is the default and can be omitted
      baseURL: "https://jiushi21.win/v1",
      dangerouslyAllowBrowser: true,
    });
  }

  async generateImage() {
    let { prompt } = this.ctx.request.body;
    prompt = prompt || "a cat";

    const imgRes = await this.openai.images.generate({
      prompt,
      size: "256x256",
      n: 1,
      model: "dall-e-2",
    });

    const imgUrl = imgRes.data[0].url;

    this.ctx.body = {
      state: "sucess",
      data: imgUrl,
      code: 200,
    };
  }
}
