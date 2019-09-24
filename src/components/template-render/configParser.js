import generateRule from './rule';

class Parser {
  constructor(ctx) {
    this.ctx = ctx;
    this.config = ctx.config;
    this.execute();
  }

  execute() {
    // 详情中的子表单
    let subs = this.config.subs;
    if (subs) {
      subs.forEach(j => {
        if (!j._rules) {
          j._rules = generateRule(j, this.ctx);
        }
      });
    }

    if (!this.config._rules) {
      this.config._rules = generateRule(this.config, this.ctx);
    }
  }
}

export default Parser;