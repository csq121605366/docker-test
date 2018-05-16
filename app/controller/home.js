'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async render() {
    const ctx = this.ctx;
    await this.ctx.model.User.insert({
      username: 'csq121605366',
      password: 'csqcsq1214'
    }).exec();
    let find = await this.ctx.model.User.findOne({
      username: 'csq121605366'
    }).exec();
    ctx.body = find.password;
  }
}

module.exports = HomeController;
