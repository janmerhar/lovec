export class Request {
  static axiosInstance = null

  static setCustomAxios(axiosInstance) {
    Request.axiosInstance = axiosInstance
  }
}
