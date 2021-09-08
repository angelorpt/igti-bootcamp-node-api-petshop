import winston from "winston";

const configureLog = () => {
  const { combine, timestamp, label, printf } = winston.format;
  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level} ${message}`;
  });
  global.logger = winston.createLogger({
    level: "silly",
    transport: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "store-api.log" }),
    ],
    format: combine(label({ label: "store-api" }), timestamp(), myFormat),
  });
};

export default configureLog;
