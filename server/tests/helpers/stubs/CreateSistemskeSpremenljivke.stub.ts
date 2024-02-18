import { ISistemskeSpremenljivke } from "@shared/types"
import mongoose from "mongoose"

export const CreateSistemskeSpremenljivkeStub =
  (): ISistemskeSpremenljivke => ({
    _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
    datum: new Date("2021-01-01"),
    PAGE_SIZE: 10,
    JAGA_MAX_MEMBERS: 10,
    OBISK_MAX_LENGTH: 10,
    USER_OBISKS_MAX_LENGTH: 10,
  })
