module.exports = class ResponseBuilder {
  constructor(status, data, message) {
    this.status = status
    this.data = data
    this.message = message
  }

  static success(data) {
    return new ResponseBuilder(200, data, "Success")
  }

  static error(message) {
    return new ResponseBuilder(500, null, message)
  }

  static unauthorized(message) {
    return new ResponseBuilder(400, null, message)
  }

  static token(token) {
    return new ResponseBuilder(200, token, "Success")
  }
}
