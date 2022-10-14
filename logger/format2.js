const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

class MyLogger {
  constructor() {
    const myFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });
    this.logger = createLogger({
      level: "debug",
      format: combine(
        format.colorize(),
        label({ label: "right meow!" }),
        timestamp({ format: "HH:mm:ss" }),
        myFormat
      ),

      transports: [
        new transports.Console(),
        new transports.File({
          filename: "errors.log",
        }),
      ],
    });
  }

  info(str) {
    this.logger.info(str, "Line: " + require("get-current-line").default(-1))
  }
}

const format2 = () => {
  return new MyLogger()
};


module.exports = format2;
