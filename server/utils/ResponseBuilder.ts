module.exports = class ResponseBuilder {
  status: number
  data: any
  message: string

  constructor(status: number, data: any, message: string) {
    this.status = status
    this.data = data
    this.message = message
  }

  static success(data: any) {
    return new ResponseBuilder(200, data, "Success")
  }

  static error(message: string) {
    return new ResponseBuilder(500, null, message)
  }

  static unauthorized(message: string) {
    return new ResponseBuilder(400, null, message)
  }

  static token(token: string) {
    return new ResponseBuilder(200, token, "Success")
  }
}
