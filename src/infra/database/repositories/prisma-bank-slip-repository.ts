import { BankSlip } from '@/app/entities/bankSlip'
import { BankSlipRepository } from '@/app/repositories/bankSlipRepository'

export class PrismaBankSlipRepository implements BankSlipRepository {
  async create(bankSlip: BankSlip): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
