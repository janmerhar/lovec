import SistemskeSpremenljivkeModel from "@models/sistemskeSpremenljivke"
import type { ISistemskeSpremenljivke } from "@shared/types"
import { ObjectId } from "mongoose"

export default class SistemskeSpremenljivke {
  id: string
  datum: Date
  PAGE_SIZE: number
  JAGA_MAX_MEMBERS: number
  OBISK_MAX_LENGTH: number
  USER_OBISKS_MAX_LENGTH: number

  constructor(
    id: string | ObjectId,
    datum: Date | string,
    PAGE_SIZE: number,
    JAGA_MAX_MEMBERS: number,
    OBISK_MAX_LENGTH: number,
    USER_OBISKS_MAX_LENGTH: number
  ) {
    if (typeof id === "string") {
      this.id = id
    } else {
      this.id = id.toString()
    }

    if (typeof datum === "string") {
      this.datum = new Date(datum)
    } else {
      this.datum = datum
    }

    this.PAGE_SIZE = PAGE_SIZE
    this.JAGA_MAX_MEMBERS = JAGA_MAX_MEMBERS
    this.OBISK_MAX_LENGTH = OBISK_MAX_LENGTH
    this.USER_OBISKS_MAX_LENGTH = USER_OBISKS_MAX_LENGTH
  }

  static async createInstance(): Promise<SistemskeSpremenljivke> {
    const sistemskeSpremenljivke =
      await SistemskeSpremenljivke.fetchSistemskeSpremenljivke()

    return new SistemskeSpremenljivke(
      sistemskeSpremenljivke._id,
      sistemskeSpremenljivke.datum,
      sistemskeSpremenljivke.PAGE_SIZE,
      sistemskeSpremenljivke.JAGA_MAX_MEMBERS,
      sistemskeSpremenljivke.OBISK_MAX_LENGTH,
      sistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH
    )
  }

  static async fetchSistemskeSpremenljivke(): Promise<ISistemskeSpremenljivke> {
    const sistemskeSpremenljivke = await SistemskeSpremenljivkeModel.find()
      .sort({ datum: -1 })
      .limit(1)

    return sistemskeSpremenljivke[0] as ISistemskeSpremenljivke
  }

  static async insertSistemskeSpremenljivke(
    PAGE_SIZE: number,
    JAGA_MAX_MEMBERS: number,
    OBISK_MAX_LENGTH: number,
    USER_OBISKS_MAX_LENGTH: number
  ): Promise<ISistemskeSpremenljivke> {
    const sistemskeSpremenljivke = await SistemskeSpremenljivkeModel.create({
      PAGE_SIZE,
      JAGA_MAX_MEMBERS,
      OBISK_MAX_LENGTH,
      USER_OBISKS_MAX_LENGTH,
    })

    return sistemskeSpremenljivke
  }

  async updateSistemskeSpremenljivke(
    PAGE_SIZE: number,
    JAGA_MAX_MEMBERS: number,
    OBISK_MAX_LENGTH: number,
    USER_OBISKS_MAX_LENGTH: number
  ): Promise<ISistemskeSpremenljivke> {
    const sistemskeSpremenljivke =
      await SistemskeSpremenljivke.insertSistemskeSpremenljivke(
        PAGE_SIZE,
        JAGA_MAX_MEMBERS,
        OBISK_MAX_LENGTH,
        USER_OBISKS_MAX_LENGTH
      )

    this.id = sistemskeSpremenljivke._id.toString()
    this.datum = sistemskeSpremenljivke.datum
    this.PAGE_SIZE = sistemskeSpremenljivke.PAGE_SIZE
    this.JAGA_MAX_MEMBERS = sistemskeSpremenljivke.JAGA_MAX_MEMBERS
    this.OBISK_MAX_LENGTH = sistemskeSpremenljivke.OBISK_MAX_LENGTH
    this.USER_OBISKS_MAX_LENGTH = sistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH

    return sistemskeSpremenljivke
  }
}
