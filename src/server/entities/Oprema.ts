import OpremaModel from "@models/opremaModel"
import { IOprema } from "@shared/types"

export default class Oprema {
  id: string
  lastnik: string
  naziv: string
  tip: string
  stanje: string
  datum: string

  constructor(
    id: string,
    lastnikId: string,
    naziv: string,
    tip: string,
    stanje: string,
    datum: Date | string
  ) {
    this.id = id
    this.lastnik = lastnikId
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje

    if (datum instanceof Date) {
      this.datum = datum.toISOString()
    } else {
      this.datum = datum
    }
  }

  static async fetchUporabnikOprema(uporabnikId: string): Promise<Oprema[]> {
    const oprema = await OpremaModel.find({ lastnik: uporabnikId })

    return oprema.map((opremaInstance) => {
      return new Oprema(
        opremaInstance._id.toString(),
        opremaInstance.lastnik.toString(),
        opremaInstance.naziv,
        opremaInstance.tip,
        opremaInstance.stanje,
        opremaInstance.datum
      )
    })
  }

  static async vnesiOprema(
    lastnikId: string,
    naziv: string,
    tip: string,
    stanje: string
  ): Promise<Oprema> {
    const oprema: IOprema = await OpremaModel.create({
      lastnik: lastnikId,
      naziv: naziv,
      tip: tip,
      stanje: stanje,
    })

    return new Oprema(
      oprema._id.toString(),
      oprema.lastnik.toString(),
      oprema.naziv,
      oprema.tip,
      oprema.stanje,
      oprema.datum
    )
  }

  static async izbrisiOprema(
    uporabnikId: string,
    id: string
  ): Promise<boolean> {
    const oprema = await OpremaModel.findOneAndDelete({
      _id: id,
      lastnik: uporabnikId,
    })

    return oprema ? true : false
  }
}
