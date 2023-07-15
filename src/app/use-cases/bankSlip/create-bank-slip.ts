import { BankSlip } from '@/app/entities/bankSlip'
import { BankSlipRepository } from '@/app/repositories/bankSlipRepository'
import { LandRepository } from '@/app/repositories/landRepository'

interface CreateBankSlipRequest {
  name_payer: string
  value: number
  payment_code: string
  landName: string | number
  active?: boolean
}

export class CreateBankSlip {
  constructor(
    private readonly landRepository: LandRepository,
    private readonly bankSlipRepository: BankSlipRepository,
  ) {}
  async execute(request: CreateBankSlipRequest) {
    const land = await this.landRepository.findByName(request.landName)
    if (!land) {
      throw new Error('Land not found')
    }
    const bankSlip = new BankSlip({ ...request, landId: land.id })
    await this.bankSlipRepository.create(bankSlip)
  }
}
