import { FindBankSlipByPayerName } from '@/app/use-cases/bankSlip/find-bank-slip-by-payer-name'
import { UploadPdfController } from './uploadPdfController'
import { PrismaBankSlipRepository } from '@/infra/database/repositories/prisma-bank-slip-repository'
import { UploadCsvController } from './uploadCsvController'
import { PrismaLandRepository } from '@/infra/database/repositories/prisma-land-repository'
import { CreateLand } from '@/app/use-cases/land/create-land'
import { CreateBankSlip } from '@/app/use-cases/bankSlip/create-bank-slip'

const prismaBankSlipRepository = new PrismaBankSlipRepository()
const prismaLandRepository = new PrismaLandRepository()

export const uploadCsvController = new UploadCsvController(
  new CreateLand(prismaLandRepository),
  new CreateBankSlip(prismaLandRepository, prismaBankSlipRepository),
)

export const uploadPdfController = new UploadPdfController(
  new FindBankSlipByPayerName(prismaBankSlipRepository),
)
