import { BankSlipRepository } from '@/app/repositories/bankSlipRepository'

export class ListBankSlips {
  constructor(private readonly bankSlipRepository: BankSlipRepository) {}
  async execute() {
    return await this.bankSlipRepository.list()
  }
}
