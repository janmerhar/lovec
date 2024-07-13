import UporabnikModel from "@models/uporabnikModel"
import Uporabnik from "@entities/Uporabnik"

export class UporabnikCron {
  static async getAllTokens(): Promise<string[]> {
    const allTokens = await UporabnikModel.find(
      {},
      { _id: 0, refresh_token: 1 }
    ).lean()

    return allTokens.map(({ refresh_token }) => refresh_token).flat()
  }

  static async getExpiredTokens(): Promise<string[]> {
    const allTokens = await UporabnikCron.getAllTokens()

    const expiredTokens = allTokens.filter((token) => {
      return !Uporabnik.JWTverifyString(token)
    })

    return expiredTokens
  }

  static async deleteExpiredTokens(): Promise<number> {
    const expiredTokens = await UporabnikCron.getExpiredTokens()

    if (expiredTokens.length === 0) {
      return 0
    }

    const res = await UporabnikModel.updateMany(
      {},
      { $pull: { refresh_token: { $in: expiredTokens } } }
    )

    return res.modifiedCount
  }
}
