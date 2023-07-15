import { PrismaBankSlipRepository } from '@/infra/database/repositories/prisma-bank-slip-repository'
import { FindController } from './findController'

const prismaBankSlipRepository = new PrismaBankSlipRepository()

export const findController = new FindController(prismaBankSlipRepository)
