/*
 * @Author: tianxun@https://gitee.com/fummmi
 * @Date: 2024-01-19 14:04:28
 * @Description: Do not edit
 * @LastEditors: fumi 330696896@qq.com
 * @LastEditTime: 2024-01-23 10:57:50
 * @FilePath: \chatgpt-english\src\db\useModule.js
 */
import mongoose from "./db.js";

// db/index.js
const Schema = mongoose.Schema;

const ceshiSchema = new Schema({
  name: { type: String, default: "tx" },
});

const MyModel = mongoose.model("messageBoard", ceshiSchema);

class Mongodb {
  constructor() {}
  // 查询
  async query(ctx) {
    try {
      const res = await MyModel.find();

      ctx.body = {
        state: "sucess",
        data: res,
        code: 200,
      };
    } catch (e) {
      ctx.body = {
        state: "error",
        data: e,
        code: 400,
      };
    }
  }
  // 保存
  save(ctx) {
    console.log("ctx", ctx.request.body);
    if (!ctx.request.body) {
      ctx.body = {
        state: "error",
        data: "参数错误",
        code: 400,
      };
      return;
    }

    new MyModel(ctx.request.body).save();
    ctx.body = {
      state: "sucess",
      data: "保存成功",
      code: 200,
    };
  }
}

export default new Mongodb();
