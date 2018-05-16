/**
 * 用户信息
 */

// const bcrypt = require("bcrypt");
// const Identicon = require("identicon.js");

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    openid: String, // 微信的id
    session_key: String, //用户登录获取的session_key
    phone: String, // 手机号 医生需要绑定手机号 使用手机号登录写文章
    sms_code: String, //手机验证码
    username: {
      type: String,
      trim: true
    }, // 用户账号
    name: String, // 姓名
    nickName: String, // 别名
    password: String, // 密码
    meta: {
      createdAt: {
        type: Date,
        default: new Date()
      },
      updatedAt: {
        type: Date,
        default: new Date()
      }
    }
  });

  UserSchema.pre("save", function(next) {
    if (this.isNew) {
      // 创建时间
      this.meta.createdAt = this.meta.updatedAt = new Date();
    } else {
      this.meta.updatedAt = new Date();
    }
    next();
  });
  UserSchema.pre("save", function(next) {
    if (this.avatar && this.avatar.imageURL) {
      this.avatarUrl = "";
    } else if (!this.avatarUrl) {
      let hash = Math.random()
        .toString(16)
        .slice(4);
      let url = "https://gravatar.com/avatar/" + hash + "?size=100&d=wavatar";
      // www.gravatar.com 被墙
      url = url.replace("www.gravatar.com", "gravatar.com");
      // 让协议自适应 protocol，使用 `//` 开头
      if (url.indexOf("http:") === 0) {
        url = url.slice(5);
      }
      this.avatarUrl = url;
    }
    next();
  });

  UserSchema.index(
    {
      name: "text",
      "department.label": "text",
      "hospital.label": "text"
    },
    {
      weights: {
        name: 10,
        "department.label": 9,
        "hospital.label": 8
      }
    }
  );

  return mongoose.model("User", UserSchema);
};
