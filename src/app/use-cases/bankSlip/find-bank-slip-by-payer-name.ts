import { BankSlipRepository } from '@/app/repositories/bankSlipRepository'

export class FindBankSlipByPayerName {
  constructor(private readonly bankSlipRepository: BankSlipRepository) {}
  async execute(payerName: string) {
    const payer = await this.bankSlipRepository.findByPayerName(payerName)
    if (payer) {
      return payer
    }
    throw new Error('Payer not found')
  }
}
