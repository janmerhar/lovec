module.exports = class ResponseBuilder {
  constructor(status, data, message) {
    this.status = status
    this.data = data
    this.message = message
  }

  static success(data) {
    new ResponseBuilder(200, data, "Success")
  }

  static error(message) {
    new ResponseBuilder(500, null, message)
    }

  static unauthorized(message) {
    new ResponseBuilder(400, null, message)
  }

  static success(data) {}
  static error(message) {}
  static unauthorized(message) {}
  static token(token) {}
}
