module.exports = class ResponseBuilder {
  constructor(status, data, message) {
    this.status = status
    this.data = data
    this.message = message
  }

  static success(data) {
    new ResponseBuilder(200, data, "Success")
  }

    if (token) {
      this.token = token
    }
  }

  static success(data) {}
  static error(message) {}
  static unauthorized(message) {}
  static token(token) {}
}
