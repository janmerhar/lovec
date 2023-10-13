import OpazovalnicaModel, { IOpazovalnica } from "@models/opazovalnicaModel"

// TODO
// naredi model za obiske,
// saj je tako lazje opravljati z njimi

export default class Opazovalnica {
  id: string
  koordinate: number[]
  obiski: any[]

  constructor(id: string, koordinate: number[], obiski: any[]) {
    this.id = id
    this.koordinate = koordinate
    this.obiski = obiski
  }

  static async fetchOpazovalnica(id: string): Promise<IOpazovalnica | null> {
    const opazovalnica = await OpazovalnicaModel.findById(id)

    return opazovalnica
  }

  static async fetchOpazovalnice(): Promise<IOpazovalnica[]> {
    const today = new Date()
    const timezoneOffset = -2

    today.setUTCHours(today.getUTCHours() + timezoneOffset)

    today.setUTCHours(0, 0, 0, 0)

    const result = await OpazovalnicaModel.aggregate([
      {
        $addFields: {
          obiski: {
            $filter: {
              input: "$obiski",
              as: "obisk",
              cond: {
                $eq: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$$obisk.zacetek",
                    },
                  },
                  { $dateToString: { format: "%Y-%m-%d", date: today } },
                ],
              },
            },
          },
        },
      },
    ]).exec()

    return result
  }

  async fetchObiski(datum: string) {}

  static async rezervirajOpazovalnico(
    uporabnikId: string,
    id: string,
    zacetek: string,
    konec: string
  ) {
    const timezoneOffset = 2

    const adjustedZacetek = new Date(zacetek)
    adjustedZacetek.setUTCHours(adjustedZacetek.getUTCHours() + timezoneOffset)

    const adjustedKonec = new Date(konec)
    adjustedKonec.setUTCHours(adjustedKonec.getUTCHours() + timezoneOffset)

    const existingDocument = await OpazovalnicaModel.findById(id)

    const dataToAppend = {
      uporabnik: uporabnikId,
      zacetek: adjustedZacetek,
      konec: adjustedKonec,
    }

    const hasOverlap = existingDocument?.obiski.some(
      (obisk) =>
        obisk.zacetek <= dataToAppend.konec &&
        obisk.konec >= dataToAppend.zacetek
    )

    if (hasOverlap) {
      throw new Error("Overlap detected with existing time blocks.")
    }

    const result = await OpazovalnicaModel.findByIdAndUpdate(
      id,
      { $push: { obiski: dataToAppend } },
      { new: true }
    )

    // TODO Handle the result or return it as needed
    return result
  }
}
