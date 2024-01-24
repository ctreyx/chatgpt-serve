/*
 * @Author: tianxun@https://gitee.com/fummmi
 * @Date: 2024-01-19 14:04:28
 * @Description: Do not edit
 * @LastEditors: fumi 330696896@qq.com
 * @LastEditTime: 2024-01-23 14:33:44
 * @FilePath: \chatgpt-english\src\db\modules\messageBoardModule.js
 */
import mongoose from "../db.js";

// db/index.js
const Schema = mongoose.Schema;

const messageBoardSchema = new Schema({
  userName: { type: String, required: true },
  content: { type: String, required: true },
  ip: { type: String, required: true },
  currentTime: { type: String, required: true },
});

const MyModel = mongoose.model("messageBoard", messageBoardSchema);

class Mongodb {
  constructor() {}
  // 查询
  async query(ctx) {
    try {
      const res = await MyModel.find();
      // console.log("数据", res);

      // 数据倒叙
      // res.reverse();

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
