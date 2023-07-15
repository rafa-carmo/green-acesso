import { PrismaBankSlipRepository } from '@/infra/database/repositories/prisma-bank-slip-repository'
import { FindController } from './findController'
import { FilterBankSplits } from '@/app/use-cases/bankSlip/filter-bank-slips'
import { ListBankSlips } from '@/app/use-cases/bankSlip/list-bank-slip'

const prismaBankSlipRepository = new PrismaBankSlipRepository()

export const findController = new FindController(
  new FilterBankSplits(prismaBankSlipRepository),
  new ListBankSlips(prismaBankSlipRepository),
)
