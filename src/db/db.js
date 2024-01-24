/*
 * @Author: tianxun@https://gitee.com/fummmi
 * @Date: 2024-01-19 11:21:06
 * @Description: Do not edit
 * @LastEditors: fumi 330696896@qq.com
 * @LastEditTime: 2024-01-19 14:39:01
 * @FilePath: \chatgpt-english\src\db\db.js
 */
// db/db.js
import mongoose from "mongoose";

const DB_URL = "mongodb://localhost:27017/chatgptEnglish";

mongoose.connect(DB_URL );

mongoose.connection.on("connected", function () {
  console.log("Mongoose 连接成功 " + DB_URL);
});
/**
 * 连接异常 error 数据库连接错误
 */
mongoose.connection.on("error", function (err) {
  console.log("Mongoose 连接失败: " + err);
});
/**
 * 连接断开 disconnected 连接异常断开
 */
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose 连接异常断开");
});

export default mongoose;
