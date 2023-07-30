import { Request } from "../util/Request"

export class Opazovalnica extends Request {
  constructor({ _id, koordinate, obiski }) {
    super()
    this.id = _id
    this.koordinate = koordinate
    this.obiski = obiski
  }

  static async fetchOpazovalnice() {
    const result = await this.axiosInstance.get("/opazovalnice")

    console.log(result)
    result.data.data = result.data.data.map(
      (opazovalnica) => new Opazovalnica(opazovalnica)
    )

    return result.data
  }

  static async rezervirajOpazovalnico(id, zacetek, konec) {
    const result = await this.axiosInstance.post(
      `/opazovalnice/${id}/rezerviraj`,
      {
        zacetek,
        konec,
      }
    )

    result.data.data = result.data.data.map(
      (opazovalnica) => new Opazovalnica(opazovalnica)
    )

    return true
  }
}
