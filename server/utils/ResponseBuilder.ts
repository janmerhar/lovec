import { Document } from "mongoose"

export default class ResponseBuilder {
  status: number
  data: any
  message: string

  constructor(status: number, data: any, message: string) {
    this.status = status
    this.data = data
    this.message = message
  }

  static success(data: any) {
    if (data instanceof Document) {
      data = data.toObject()
    }

    return new ResponseBuilder(200, data, "success")
  }

  static error(message: string) {
    return new ResponseBuilder(500, null, message)
  }

  static unauthorized(message: string) {
    return new ResponseBuilder(401, null, message)
  }

  static token(token: string) {
    return new ResponseBuilder(200, token, "success")
  }
}
