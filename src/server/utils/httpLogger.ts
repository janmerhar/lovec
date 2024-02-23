import morgan, { StreamOptions } from "morgan"

import Logger from "./logger"

const stream: StreamOptions = {
  write: (message) => Logger.http(message.trim()),
}

const skip = () => {
  const env = process.env.NODE_ENV || "development"
  return env !== "development"
}

// Build the morgan middleware
const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
)

export default httpLogger
