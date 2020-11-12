const { resolve } = require("path");
const { Readable } = require("stream");

const _delay = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

const _getText = async () => {
  await _delay(100);

  return '"Max","https://github.com/tutv"\n';
};

class MyFileStreaming extends Readable {
  constructor(opt) {
    super(opt);

    this._i = 0;
    this.push('"Name", "Url"\n');
  }

  async _read() {
    this._i = this._i + 1;
    if (this._i >= 1000) {
      // Push null to finish
      return this.push(null);
    }

    const row = await _getText();
    this.push(row);
  }
}

module.exports = { MyFileStreaming };
