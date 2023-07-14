import { BankSlip } from '@/app/entities/bankSlip'
import { BankSlipRepository } from '@/app/repositories/bankSlipRepository'

export class InMemoryBankSlipRepository implements BankSlipRepository {
  constructor() {}
  public bankSlips: BankSlip[] = []
  async create(bankSlip: BankSlip): Promise<void> {
    bankSlip.id = this.bankSlips.length + 1
    this.bankSlips.push(bankSlip)
  }
  async list(): Promise<BankSlip[]> {
    return this.bankSlips
  }
}
