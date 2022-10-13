const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json, prettyPrint } = format;
const line = require("get-current-line");

const format1 = () => {
  return createLogger({
    level: "debug",
    format: combine(
      timestamp(),
      json(),
      prettyPrint()
      // printf((info) => {
      //   return line.default().line;
      // })
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
};

module.exports = format1;
