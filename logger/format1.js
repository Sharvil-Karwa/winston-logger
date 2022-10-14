const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json, prettyPrint } = format;
const fileInfo = require("get-current-line")

class MyLogger {
  constructor() {
    this.logger = createLogger({
      level: "debug",
      format: combine(
        timestamp(),
        json(),
        prettyPrint()
      ),
      defaultMeta: { service: "user-service" },
      transports: [
        new transports.Console({
          depth: true,
        }),
        new transports.File({
          filename: "errors.log",
        }),
        new transports.File({
          level: "error",
          filename: "./logs/example-3.log",
        }),
      ],
    });
  }

  getFileInfo() {
    let { line, method, file } = fileInfo.default({ frames: 3 })
    return { line, method, file }
  }

  info(str) {
    this.logger.info(str, this.getFileInfo(), __dirname)
  }

  warn(str) {
    this.logger.info(str, this.getFileInfo())
  }

  error(str) {
    this.logger.info(str, this.getFileInfo())
  }

  debug(str) {
    this.logger.info(str, this.getFileInfo())
  }
}

const format1 = () => {
  return new MyLogger();
};

module.exports = format1;
